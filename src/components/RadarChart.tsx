'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Axis, DIMENSIONS } from '@/lib/types';

interface Props {
    scores: Record<Axis, number>;
}

export default function ResultRadarChart({ scores }: Props) {
    // Mapping 4 axes to "Shen-Left-Tu" Triangle
    // 1. 左 (Left): Economic Equality + Social Justice
    //    Formula: (100 - Economic) * 0.7 + (100 - Cultural) * 0.3
    // 2. 兔 (Tu/Nationalist): Nationalism + Stability
    //    Formula: (100 - National) * 0.7 + (100 - Environmental) * 0.3
    // 3. 神 (Shen/Liberal): Globalism + Deconstruction + Market

    // Scores are 0-100.
    // Economic: 0(Left) - 100(Right)
    // Cultural: 0(Trad) - 100(Prog)
    // National: 0(Pro-China) - 100(Export/Run)
    // Environmental: 0(Order) - 100(Chaos)

    const leftScore = Math.min(100, (100 - scores.economic) * 0.6 + (100 - scores.cultural) * 0.2 + (scores.environmental > 50 ? 20 : 0));
    // 'Left' correlates with Public ownership (Eco Low) + Progressivism (Cul High)? 
    // Actually, Chinese 'Net Left' (Maoist) is often Eco Low + Cul Low (Social Conservative). 
    // Let's simplify: Left = Economic Left.
    const finalLeft = (100 - scores.economic);

    // Tu (Rabbit): Strong Nationalist.
    const finalTu = (100 - scores.national);

    // Shen (God): Reverse Nationalist / Liberal. 
    // High National score means "Run" / "Globalist".
    const finalShen = scores.national;

    // Wait, if simple mapping:
    // Nat=0 -> Tu=100, Shen=0.
    // Nat=100 -> Tu=0, Shen=100.
    // This makes Tu and Shen mutually exclusive on the same axis.
    // But user wants a Triangle.
    // A Triangle usually implies 3 distinct directions.
    // Maybe:
    // 1. Left (Economic Left)
    // 2. Auth/National (Tu)
    // 3. Lib/Global (Shen)

    // Let's try this mapping based on the "Triangle" meme:
    // Top: 兔 (Nationalism) -> Derived from (100 - National)
    // Left: 左 (Equality) -> Derived from (100 - Economic)
    // Right: 神 (Liberty/West) -> Derived from (National + Economic)/2 ?

    // Let's just use the raw values specific to the archetypes:
    // "兔": Priority on National Interest. (100 - National)
    // "左": Priority on Class Struggle. (100 - Economic)
    // "神": Priority on Individual/Western Values. (Cultural + National)/2 ?
    // Actually, "Shen" in 2025 context is heavily tied to "Run" (National High) and "Chaos" (Environmental High).

    const vTu = 100 - scores.national;
    const vLeft = 100 - scores.economic;
    const vShen = (scores.national + scores.environmental) / 2; // Run + Chaos

    const data = [
        { subject: "兔 (爱国/建制)", A: vTu, fullMark: 100 },
        { subject: "左 (公平/革命)", A: vLeft, fullMark: 100 },
        { subject: "神 (自由/解构)", A: vShen, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 16, fontWeight: 'bold' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="意识形态倾向"
                        dataKey="A"
                        stroke="#7c3aed"
                        strokeWidth={4}
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
