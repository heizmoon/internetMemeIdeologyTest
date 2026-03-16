import { DIMENSIONS } from '@/lib/config';
import { ScoreMap } from '@/lib/types';

interface StatData {
  total: number;
  ideologyCounts: Record<string, number>;
  scoreSums: Record<string, number>;
}

const initialScoreSums = DIMENSIONS.reduce<Record<string, number>>((acc, dimension) => {
  acc[dimension.id] = 0;
  return acc;
}, {});

const DATA: StatData = {
  total: 0,
  ideologyCounts: {},
  scoreSums: initialScoreSums,
};

export const StatsService = {
  addResult: (scores: ScoreMap, label: string) => {
    DATA.total += 1;

    if (!DATA.ideologyCounts[label]) {
      DATA.ideologyCounts[label] = 0;
    }
    DATA.ideologyCounts[label] += 1;

    DIMENSIONS.forEach((dimension) => {
      const current = DATA.scoreSums[dimension.id] ?? 0;
      const nextScore = typeof scores[dimension.id] === 'number' ? scores[dimension.id] : 50;
      DATA.scoreSums[dimension.id] = current + nextScore;
    });
  },

  getStats: () => {
    const averages = DIMENSIONS.reduce<Record<string, number>>((acc, dimension) => {
      acc[dimension.id] = DATA.total > 0 ? Math.round((DATA.scoreSums[dimension.id] ?? 0) / DATA.total) : 50;
      return acc;
    }, {});

    return {
      total: DATA.total,
      distribution: DATA.ideologyCounts,
      averages,
    };
  },
};
