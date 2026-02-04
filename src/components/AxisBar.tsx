import { Dimension } from '@/lib/types';

interface Props {
    dimension: Dimension;
    score: number;
}

export default function AxisBar({ dimension, score }: Props) {
    // Score 0 = Left Label 100%, Right Label 0%
    // Score 100 = Left Label 0%, Right Label 100%

    return (
        <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span style={{ color: dimension.color }}>{dimension.leftLabel}</span>
                <span style={{ color: dimension.color }}>{dimension.rightLabel}</span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                {/* Left Side Bar */}
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-1000"
                    style={{
                        width: `${score}%`,
                        backgroundColor: dimension.color,
                        opacity: 0.8
                    }}
                />

                {/* Indicator */}
                <div
                    className="absolute top-0 h-full w-1 bg-white shadow-sm scale-125 z-10 transition-all duration-1000"
                    style={{ left: `${score}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{100 - score}%</span>
                <span>{score}%</span>
            </div>
        </div>
    );
}
