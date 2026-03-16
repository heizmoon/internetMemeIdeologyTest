'use client';

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

/**
 * 8-axis radar chart mapping the 4 quiz dimensions to 8 named political concepts.
 * Each dimension is split into its two poles so the radar shows a full profile:
 *
 *   economic  → 市场 (right/high) & 计划 (left/low)
 *   governance → 自由 (right/high) [& implied 威权 on opposite]
 *   social     → 个人 (right/high) & 集体 (left/low)
 *   national   → 国际 (right/high) & 民族 (left/low)
 *   平等 is derived as complement to 市场 (economic left = equality focus)
 */
function buildEightAxes(scores: ScoreMap) {
  const eco = scores['economic'] ?? 50;     // high = market/free
  const gov = scores['governance'] ?? 50;   // high = liberal/free
  const soc = scores['social'] ?? 50;       // high = progressive/individual
  const nat = scores['national'] ?? 50;     // high = international

  // Arrange 8 spokes evenly: opposite spokes are natural complements
  return [
    { subject: '自由', value: gov },              // governance → freedom  (top)
    { subject: '国际', value: nat },              // national → international (top-right)
    { subject: '市场', value: eco },              // economic → market (right)
    { subject: '个人', value: soc },              // social → individualist (bottom-right)
    { subject: '威权', value: 100 - gov },        // opposite of 自由 (bottom)
    { subject: '民族', value: 100 - nat },        // opposite of 国际 (bottom-left)
    { subject: '计划', value: 100 - eco },        // opposite of 市场 (left)
    { subject: '集体', value: 100 - soc },        // opposite of 个人 (top-left)
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
  const data = buildEightAxes(scores);

  return (
    <div className="w-full h-[300px] md:h-[360px]" style={{ width: '100%', height: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="62%" data={data}>
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
