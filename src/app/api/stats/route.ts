import { NextResponse } from 'next/server';
import { StatsService } from '@/lib/store';

export async function GET() {
    const stats = StatsService.getStats();
    return NextResponse.json(stats);
}
