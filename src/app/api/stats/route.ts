import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { DIMENSIONS } from '@/lib/config';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Get Cloudflare D1 database with multiple fallbacks
    let db: any = null;
    
    // 1. Try RequestContext (Standard for next-on-pages)
    try {
      const context = getRequestContext();
      if (context && context.env) {
        db = (context.env as any).DB;
      }
    } catch (e) {}

    // 2. Try process.env (Fallback for some runtimes)
    if (!db && typeof process !== 'undefined' && process.env) {
      db = (process.env as any).DB;
    }

    // 3. Try globalThis (Sometimes bindings are global)
    if (!db && (globalThis as any).DB) {
      db = (globalThis as any).DB;
    }

    if (!db) {
      const url = new URL(request.url);
      const isPreview = url.hostname.includes('.pages.dev') && !url.hostname.includes('internetmemeideologytest.pages.dev');
      
      return NextResponse.json({ 
        error: 'D1 Database not found',
        diagnostics: {
          hostname: url.hostname,
          isPreview,
          tip: isPreview ? 'Detection: You are on a Preview environment. Ensure the "DB" binding is added to BOTH Production and Preview environments in Cloudflare Settings.' : 'Ensure the D1 binding name is exactly "DB".'
        }
      }, { status: 500 });
    }

    // Get total count and distribution
    const result = await db.prepare(
      'SELECT archetype, COUNT(*) as count FROM results GROUP BY archetype'
    ).all();

    const distribution: Record<string, number> = {};
    let total = 0;
    
    result.results.forEach((row: any) => {
      distribution[row.archetype] = row.count;
      total += row.count;
    });

    // Calculate averages
    const allScores = await db.prepare('SELECT scores FROM results').all();
    const scoreSums: Record<string, number> = {};
    DIMENSIONS.forEach(d => scoreSums[d.id] = 0);

    allScores.results.forEach((row: any) => {
      try {
        const scores = JSON.parse(row.scores);
        DIMENSIONS.forEach(d => {
          scoreSums[d.id] += scores[d.id] || 50;
        });
      } catch (e) {
        console.error('Failed to parse score row:', row.scores);
      }
    });

    const averages: Record<string, number> = {};
    DIMENSIONS.forEach(d => {
      averages[d.id] = total > 0 ? Math.round(scoreSums[d.id] / total) : 50;
    });

    return NextResponse.json({
      total,
      distribution,
      averages
    });
  } catch (error: any) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error.message
    }, { status: 500 });
  }
}
