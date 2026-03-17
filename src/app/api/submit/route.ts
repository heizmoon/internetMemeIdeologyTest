import { NextResponse } from 'next/server';
import { getIdeologyLabel } from '@/lib/scoring';
import { ScoreMap } from '@/lib/types';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const scores = (await request.json()) as ScoreMap;
    const label = getIdeologyLabel(scores);

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
      console.error('D1 Database binding (DB) not found in RequestContext or process.env');
      return NextResponse.json({ 
        success: false, 
        error: 'Database binding missing',
        diagnostics: {
          hasProcessEnv: typeof process !== 'undefined',
          envKeys: typeof process !== 'undefined' ? Object.keys(process.env) : []
        }
      }, { status: 500 });
    }

    await db.prepare(
      'INSERT INTO results (archetype, scores) VALUES (?, ?)'
    )
    .bind(label, JSON.stringify(scores))
    .run();

    return NextResponse.json({ success: true, label });
  } catch (error: any) {
    console.error('Failed to submit result:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
