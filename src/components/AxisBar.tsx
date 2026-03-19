import { Dimension } from '@/lib/types';
import Image from 'next/image';

interface Props {
    dimension: Dimension;
    score: number;
}

export default function AxisBar({ dimension, score }: Props) {
    const leftPercent = 100 - score;
    const rightPercent = score;

    // Inset constants: sliderValue.png has decorative borders that need to be
    // aligned with the inner track of sliderBar.png.
    // We shift the fill slightly right and inset top/bottom so it sits in the slot.
    const INSET_LEFT = 22;   // px offset from left edge of bar
    const INSET_TOP = 5;    // px offset from top
    const BAR_HEIGHT = 30;  // total bar height in px
    const FILL_HEIGHT = BAR_HEIGHT - INSET_TOP * 2;

    return (
        <div className="w-full mb-1">
            {/* Labels row */}
            <div className="flex justify-between items-end mb-1 px-2">
                <span
                    className="font-serif font-bold text-sm tracking-wider"
                    style={{
                        color: '#efe7d2ff',
                        textShadow: '0 0 3px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,1)',
                    }}
                >
                    {dimension.leftLabel}&nbsp;[{leftPercent}%]
                </span>
                <span
                    className="font-serif font-bold text-sm tracking-wider"
                    style={{
                        color: '#efe7d2ff',
                        textShadow: '0 0 3px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,1)',
                    }}
                >
                    {dimension.rightLabel}&nbsp;[{rightPercent}%]
                </span>
            </div>

            {/* Slider bar */}
            <div className="relative w-full" style={{ height: `${BAR_HEIGHT}px` }}>
                {/* Dark bar background — full width */}
                <Image
                    src="/results_page_sliderBar.png"
                    alt="slider bar"
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, 460px"
                    unoptimized
                />

                {/* Golden fill — inset into the bar's inner track slot */}
                {leftPercent > 0 && (
                    <div
                        className="absolute overflow-hidden"
                        style={{
                            // Start from INSET_LEFT to skip the decorative left border
                            left: `${INSET_LEFT}px`,
                            top: `${INSET_TOP}px`,
                            height: `${FILL_HEIGHT}px`,
                            // Fill represents the LEFT dimension intensity
                            width: `calc(${leftPercent}% - ${INSET_LEFT * 2}px)`,
                        }}
                    >
                        <div
                            className="relative"
                            style={{
                                width: leftPercent > 0 ? `${(10000 / leftPercent)}%` : '100%',
                                height: `${FILL_HEIGHT}px`,
                            }}
                        >

                            <Image
                                src="/results_page_sliderValue.png"
                                alt="slider fill"
                                fill
                                className="object-fill"
                                sizes="(max-width: 768px) 100vw, 460px"
                                unoptimized
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
