import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { DIMENSIONS } from '@/lib/config';

export const runtime = 'edge';

export async function GET() {
  try {
    // Get Cloudflare D1 database with multiple fallbacks
    let db: any = null;
    
    try {
      const context = getRequestContext();
      if (context && context.env) {
        db = (context.env as any).DB;
      }
    } catch (e) {
      console.log('getRequestContext failed, trying process.env');
    }

    if (!db && typeof process !== 'undefined' && process.env) {
      db = (process.env as any).DB;
    }

    if (!db) {
      return NextResponse.json({ 
        error: 'Database not found',
        diagnostics: {
          hasProcessEnv: typeof process !== 'undefined',
          envKeys: typeof process !== 'undefined' ? Object.keys(process.env) : []
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
      success: false, 
      error: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
