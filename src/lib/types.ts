export type Axis = 'economic' | 'cultural' | 'national' | 'environmental';

export interface Dimension {
    id: Axis;
    name: string;
    leftLabel: string; // e.g. Equality, Tradition, Nationalism
    rightLabel: string; // e.g. Market, Progress, Globalism
    color: string;
}

export interface Option {
    id: string;
    text: string;
    effect: {
        [key in Axis]?: number;
    };
}

export interface Question {
    id: string;
    text: string;
    options: Option[];
}

export interface TestResult {
    stats: {
        [key in Axis]: number; // 0 (Left) to 100 (Right)
    };
    label: string;
    description: string;
}

export const DIMENSIONS: Dimension[] = [
    {
        id: 'economic',
        name: '经济观念',
        leftLabel: '公有/均贫富',
        rightLabel: '市场/私有化',
        color: '#f87171' // Red
    },
    {
        id: 'cultural',
        name: '社会文化',
        leftLabel: '传统/保守',
        rightLabel: '进步/觉醒',
        color: '#60a5fa' // Blue
    },
    {
        id: 'national',
        name: '民族立场',
        leftLabel: '民族主义',
        rightLabel: '世界主义',
        color: '#fbbf24' // Amber
    },
    {
        id: 'environmental',
        name: '生存心态',
        leftLabel: '岁月静好',
        rightLabel: '加速/乐子',
        color: '#34d399' // Emerald
    }
];
