import { NextResponse } from 'next/server';
import { StatsService } from '@/lib/store';
import { getIdeologyLabel } from '@/lib/scoring';
import { ScoreMap } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const scores = (await request.json()) as ScoreMap;
    const label = getIdeologyLabel(scores);

    StatsService.addResult(scores, label);

    return NextResponse.json({ success: true, label });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
