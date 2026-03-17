import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { DIMENSIONS } from '@/lib/config';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getRequestContext().env.DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not found' }, { status: 500 });
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

    // Calculate averages (this could be complex in SQL, doing it in JS for simplicity or we could optimize later)
    const allScores = await db.prepare('SELECT scores FROM results').all();
    const scoreSums: Record<string, number> = {};
    DIMENSIONS.forEach(d => scoreSums[d.id] = 0);

    allScores.results.forEach((row: any) => {
      const scores = JSON.parse(row.scores);
      DIMENSIONS.forEach(d => {
        scoreSums[d.id] += scores[d.id] || 50;
      });
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
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
