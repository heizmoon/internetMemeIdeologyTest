import { NextResponse } from 'next/server';
import { StatsService } from '@/lib/store';
import { getIdeologyLabel } from '@/lib/scoring';
import { Axis } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const scores = await request.json() as Record<Axis, number>;
        const label = getIdeologyLabel(scores);

        // Simulate latency
        // await new Promise(r => setTimeout(r, 500));

        StatsService.addResult(scores, label);

        return NextResponse.json({ success: true, label });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
