import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { DIMENSIONS } from '@/lib/config';

export const runtime = 'edge';

/**
 * 助手函数：多路径寻找 D1 绑定
 */
async function getD1Binding() {
  try {
    const context = getRequestContext();
    if (context?.env?.DB) return context.env.DB;
  } catch (e) {}

  if (typeof process !== 'undefined' && process.env?.DB) {
    return (process.env as any).DB;
  }

  if ((globalThis as any).DB) {
    return (globalThis as any).DB;
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const db = await getD1Binding();

    if (!db) {
      console.error('[API/Stats] D1 Database binding missing');
      return NextResponse.json({ 
        error: 'Database connection failed.',
        diagnostic: 'DB binding not found. Please ensure your Cloudflare Pages project has a D1 database named "DB" bound to it in both Production and Preview environments.'
      }, { status: 500 });
    }

    // 1. 获取计数与分布
    let statsResult;
    try {
      statsResult = await db.prepare(
        'SELECT archetype, COUNT(*) as count FROM results GROUP BY archetype'
      ).all();
    } catch (e: any) {
      return NextResponse.json({ error: 'DB Query Failed (Stats)', details: e.message }, { status: 500 });
    }

    const distribution: Record<string, number> = {};
    let total = 0;
    
    statsResult.results.forEach((row: any) => {
      distribution[row.archetype] = row.count;
      total += row.count;
    });

    // 2. 获取所有分值计算平均值
    let allScores;
    try {
      allScores = await db.prepare('SELECT scores FROM results').all();
    } catch (e: any) {
      return NextResponse.json({ error: 'DB Query Failed (Scores)', details: e.message }, { status: 500 });
    }

    const scoreSums: Record<string, number> = {};
    DIMENSIONS.forEach(d => scoreSums[d.id] = 0);

    allScores.results.forEach((row: any) => {
      try {
        const scores = JSON.parse(row.scores);
        DIMENSIONS.forEach(d => {
          scoreSums[d.id] += scores[d.id] || 50;
        });
      } catch (e) {
        console.error('[API/Stats] Failed to parse score row:', row.scores);
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
    console.error('[API/Stats] Global error:', error);
    return NextResponse.json({ 
      error: 'Stats API Internal Error',
      details: error.message
    }, { status: 500 });
  }
}
