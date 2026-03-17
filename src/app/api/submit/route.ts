import { NextResponse } from 'next/server';
import { getIdeologyLabel } from '@/lib/scoring';
import { ScoreMap } from '@/lib/types';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

/**
 * 助手函数：多路径寻找 D1 绑定
 */
async function getD1Binding() {
  // 1. 优先尝试 RequestContext
  try {
    const context = getRequestContext();
    if (context?.env?.DB) return context.env.DB;
  } catch (e) {}

  // 2. 尝试 process.env (兼容性)
  if (typeof process !== 'undefined' && process.env?.DB) {
    return (process.env as any).DB;
  }

  // 3. 尝试全局 globalThis (某些构建环境)
  if ((globalThis as any).DB) {
    return (globalThis as any).DB;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const scores = (await request.json()) as ScoreMap;
    const label = getIdeologyLabel(scores);
    const db = await getD1Binding();

    if (!db) {
      console.error('[API/Submit] D1 Database binding missing');
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure D1 binding named "DB" is attached to your Pages project.',
        diagnostic: 'Binding missing from RequestContext/env/global'
      }, { status: 500 });
    }

    try {
      await db.prepare(
        'INSERT INTO results (archetype, scores) VALUES (?, ?)'
      )
      .bind(label, JSON.stringify(scores))
      .run();
    } catch (dbError: any) {
      console.error('[API/Submit] DB Execution error:', dbError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to write to database: ' + dbError.message,
        diagnostic: 'Check if results table and columns are correctly initialized.'
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, label });
  } catch (error: any) {
    console.error('[API/Submit] Global error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Submit API Internal Error: ' + error.message 
    }, { status: 500 });
  }
}
