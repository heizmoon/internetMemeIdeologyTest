import { DIMENSIONS, QUESTIONS } from '@/lib/config';
import { Question, ResultSummary, ScoreMap } from '@/lib/types';

const INITIAL_SCORE = 50;
const MAX_SCORE = 100;
const MIN_SCORE = 0;

function clamp(value: number): number {
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, value));
}

export function createInitialScores(): ScoreMap {
  return DIMENSIONS.reduce<ScoreMap>((acc, dimension) => {
    acc[dimension.id] = INITIAL_SCORE;
    return acc;
  }, {});
}

export function calculateScore(
  answers: Record<string, string>,
  questions: Question[] = QUESTIONS
): ScoreMap {
  const scores = createInitialScores();

  questions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;

    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    if (!selectedOption) return;

    Object.entries(selectedOption.effect).forEach(([dimensionId, change]) => {
      if (typeof change !== 'number' || Number.isNaN(change)) return;
      scores[dimensionId] = clamp((scores[dimensionId] ?? INITIAL_SCORE) + change);
    });
  });

  return scores;
}

// ── 8 predefined archetypes ──────────────────────────────────────────────────

interface Archetype {
  label: string;
  emoji: string;
  description: string;
  /** Ideal score coordinates [economic, governance, social, national] */
  center: Record<string, number>;
}

const ARCHETYPES: Archetype[] = [
  {
    label: '兔友战士',
    emoji: '🐰',
    description:
      '你是键政圈坚定的建制派。你相信国家力量，认为外部势力是主要矛盾，社会应以稳定为先。你的对手叫你"粉红"，但你觉得爱国有什么错？',
    center: { economic: 30, governance: 20, social: 25, national: 15 },
  },
  {
    label: '网左先锋',
    emoji: '⚒️',
    description:
      '你是马克思主义左翼的网络传承者。阶级斗争是你的核心信仰，你关注工人权益和分配不公。你可能怀念某个时代，但你拒绝被简单标签化。',
    center: { economic: 15, governance: 25, social: 45, national: 35 },
  },
  {
    label: '自由派知识分子',
    emoji: '🌐',
    description:
      '你追求普世价值，推崇言论自由和权力制衡。你倾向于用全球视野审视问题，认为开放与透明是解决问题的钥匙。你在键政圈常被叫做"神神"。',
    center: { economic: 65, governance: 80, social: 80, national: 75 },
  },
  {
    label: '建制皇汉',
    emoji: '🏯',
    description:
      '你支持现有体制，同时拥有强烈的汉民族文化自豪感。"1644史观"让你振奋，你认为华夏文明本身是先进的，只需要找回正统。',
    center: { economic: 40, governance: 20, social: 15, national: 10 },
  },
  {
    label: '理性中间派',
    emoji: '💼',
    description:
      '你不走极端，在每个议题上都试图寻找平衡。你可能被所有立场的人嘲笑为"骑墙派"，但你觉得务实思考比站队更重要。',
    center: { economic: 50, governance: 50, social: 50, national: 50 },
  },
  {
    label: '解构乐子人',
    emoji: '🎭',
    description:
      '认真你就输了！你善于用阴阳怪气和"魔法对轰"消解一切严肃立场。在审查和经济压力的夹缝中，你选择了用荒诞对抗荒诞。',
    center: { economic: 55, governance: 65, social: 60, national: 45 },
  },
  {
    label: '加速主义者',
    emoji: '🔥',
    description:
      '你认为现有体制的矛盾无法通过改良解决。不如让矛盾加速爆发，推动根本变革。你是键政圈里最激进的一派，每天都盼着"大的要来了"。',
    center: { economic: 70, governance: 75, social: 70, national: 55 },
  },
  {
    label: '阶层焦虑者',
    emoji: '📱',
    description:
      '苹果人还是安卓人？这是你最关心的问题。你敏锐地感知到阶层固化和贫富差距，经济地位和社会流动性是你评判一切政策的核心标尺。',
    center: { economic: 35, governance: 45, social: 55, national: 40 },
  },
];

function euclideanDistance(scores: ScoreMap, center: Record<string, number>): number {
  let sum = 0;
  for (const key of Object.keys(center)) {
    const diff = (scores[key] ?? INITIAL_SCORE) - center[key];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

export function getResultSummary(scores: ScoreMap): ResultSummary {
  let bestArchetype = ARCHETYPES[4]; // default: centrist
  let bestDistance = Infinity;

  for (const archetype of ARCHETYPES) {
    const dist = euclideanDistance(scores, archetype.center);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestArchetype = archetype;
    }
  }

  // Build dominant leans for radar chart compatibility
  const dominantLeans = DIMENSIONS.map((dimension) => {
    const score = clamp(scores[dimension.id] ?? INITIAL_SCORE);
    const directionLabel = score >= INITIAL_SCORE ? dimension.rightLabel : dimension.leftLabel;
    return {
      dimensionId: dimension.id,
      dimensionName: dimension.name,
      score,
      directionLabel,
    };
  })
    .sort((a, b) => Math.abs(b.score - INITIAL_SCORE) - Math.abs(a.score - INITIAL_SCORE))
    .slice(0, 2);

  return {
    label: bestArchetype.label,
    emoji: bestArchetype.emoji,
    description: bestArchetype.description,
    dominantLeans,
  };
}

export function getIdeologyLabel(scores: ScoreMap): string {
  return getResultSummary(scores).label;
}
