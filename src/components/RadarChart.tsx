'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { ScoreMap } from '@/lib/types';

interface Props {
  scores: ScoreMap;
}

function buildEightAxes(scores: ScoreMap) {
  const eco = scores['economic'] ?? 50;
  const gov = scores['governance'] ?? 50;
  const soc = scores['social'] ?? 50;
  const nat = scores['national'] ?? 50;

  return [
    { subject: '自由', value: gov },
    { subject: '国际', value: nat },
    { subject: '市场', value: eco },
    { subject: '个人', value: soc },
    { subject: '威权', value: 100 - gov },
    { subject: '民族', value: 100 - nat },
    { subject: '计划', value: 100 - eco },
    { subject: '集体', value: 100 - soc },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTick(props: any) {
  const { x, y, payload } = props;
  return (
    <text
      x={Number(x)}
      y={Number(y)}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#3f210d"
      fontSize={12}
      fontWeight={700}
      fontFamily="serif"
    >
      {payload.value}
    </text>
  );
}

export default function ResultRadarChart({ scores }: Props) {
  const [mounted, setMounted] = useState(false);
  const data = buildEightAxes(scores);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[300px] flex items-center justify-center font-serif italic text-sm text-[#8b6c45]">生成画像中...</div>;
  }

  return (
    <div className="w-full h-[320px] max-w-[400px]">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="#bba078" strokeOpacity={0.6} />
          <PolarAngleAxis
            dataKey="subject"
            tick={CustomTick}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Ideology Profile"
            dataKey="value"
            stroke="#5c3c1e"
            strokeWidth={2.5}
            fill="#a68a56"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
