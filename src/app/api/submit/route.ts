import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getIdeologyLabel } from '@/lib/scoring';
import { StatsService } from '@/lib/store';
import { ScoreMap } from '@/lib/types';

export const runtime = 'edge';

async function getD1Binding() {
  try {
    const context = getRequestContext();
    if (context?.env?.DB) return context.env.DB;
  } catch {}

  const globalBinding = (globalThis as { DB?: unknown }).DB;
  return globalBinding ?? null;
}

export async function POST(request: Request) {
  try {
    const scores = (await request.json()) as ScoreMap;
    const label = getIdeologyLabel(scores);
    const db = await getD1Binding();

    if (!db) {
      StatsService.addResult(scores, label);
      return NextResponse.json({
        success: true,
        label,
        storage: 'memory',
      });
    }

    await (db as D1Database)
      .prepare('INSERT INTO results (archetype, scores) VALUES (?, ?)')
      .bind(label, JSON.stringify(scores))
      .run();

    return NextResponse.json({
      success: true,
      label,
      storage: 'd1',
    });
  } catch (error) {
    console.error('[API/Submit] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
