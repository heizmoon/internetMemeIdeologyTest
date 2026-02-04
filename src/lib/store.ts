import { Axis } from './types';

// Simple in-memory storage for MVP
// In production, replace this with Vercel KV or Postgres

interface StatData {
    total: number;
    ideologyCounts: Record<string, number>;
    axisSums: Record<Axis, number>;
}

let DATA: StatData = {
    total: 1245, // Fake initial data for "wow" factor
    ideologyCounts: {
        "乐子人 (Doomer/Joker)": 320,
        "红色卫士 (Red Guard)": 150,
        "高华 (Elite Globalist)": 200,
        "传统皇汉 (Traditional Nationalist)": 180,
        "自由意志 (Libertarian)": 210,
        "日子人 (Normie)": 185
    },
    axisSums: {
        economic: 1245 * 50,
        cultural: 1245 * 50,
        national: 1245 * 50,
        environmental: 1245 * 50
    }
};

export const StatsService = {
    addResult: (scores: Record<Axis, number>, label: string) => {
        DATA.total += 1;
        if (!DATA.ideologyCounts[label]) DATA.ideologyCounts[label] = 0;
        DATA.ideologyCounts[label] += 1;

        // Add sums
        (Object.keys(scores) as Axis[]).forEach(axis => {
            DATA.axisSums[axis] += scores[axis];
        });
    },

    getStats: () => {
        const avgScores: Record<string, number> = {};
        (Object.keys(DATA.axisSums) as Axis[]).forEach(axis => {
            avgScores[axis] = Math.round(DATA.axisSums[axis] / DATA.total);
        });

        return {
            total: DATA.total,
            distribution: DATA.ideologyCounts,
            averages: avgScores
        };
    }
};
