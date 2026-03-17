import { NextResponse } from 'next/server';
import { getIdeologyLabel } from '@/lib/scoring';
import { ScoreMap } from '@/lib/types';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const scores = (await request.json()) as ScoreMap;
    const label = getIdeologyLabel(scores);

    // Get Cloudflare D1 database from request context
    const db = (getRequestContext().env as any).DB;

    if (db) {
      await db.prepare(
        'INSERT INTO results (archetype, scores) VALUES (?, ?)'
      )
      .bind(label, JSON.stringify(scores))
      .run();
    }

    return NextResponse.json({ success: true, label });
  } catch (error) {
    console.error('Failed to submit result:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
