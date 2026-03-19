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
  figureReferences: string[];
  figureNote: string;
  /** Ideal score coordinates [economic, governance, social, national] */
  center: Record<string, number>;
}

const ARCHETYPES: Archetype[] = [
  {
    label: '兔友战士',
    emoji: '🐰',
    description:
      '2025 的大多数热点里，你更容易站到“别被带节奏、国家会处理、外部压力才是主因”这一边。你对秩序、统一叙事和国家能力有很强信心。',
    figureReferences: ['沈逸'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 30, governance: 20, social: 22, national: 15 },
  },
  {
    label: '网左先锋',
    emoji: '⚒️',
    description:
      '你看到的世界，核心问题往往不是外部势力，而是平台压榨、阶层固化、资源分配和劳动者处境。你对“谁掌握生产和分配”尤其敏感。',
    figureReferences: ['未明子'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 18, governance: 40, social: 56, national: 38 },
  },
  {
    label: '自由派公知',
    emoji: '🌐',
    description:
      '你最关心的是程序、监督、表达空间和公开透明。无论热点怎么轮换，你都倾向先问一句：权力有没有被约束，普通人有没有说话的空间。',
    figureReferences: ['柴静'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 44, governance: 78, social: 76, national: 66 },
  },
  {
    label: '建制皇汉',
    emoji: '🏯',
    description:
      '你既认同强国家，也非常看重汉文明主体性。到了 2025 的热点语境里，你往往最警惕身份稀释、历史叙事松动和文化正统被解构。',
    figureReferences: ['吃瓜盟主'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 38, governance: 20, social: 14, national: 8 },
  },
  {
    label: '理性中间派',
    emoji: '💼',
    description:
      '你对大多数热点的第一反应不是喊口号，而是先拆结构、找边界、看代价。你不爱把一切都推到极端，也不信情绪一上头就能解决问题。',
    figureReferences: ['马督工'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 40, governance: 46, social: 64, national: 38 },
  },
  {
    label: '解构乐子人',
    emoji: '🎭',
    description:
      '你对宏大叙事天然起疑，看到热点更想拆台、玩梗、反讽。比起认真站队，你更习惯先看谁在表演、谁在把大家当傻子。',
    figureReferences: ['峰哥（亡命天涯）'],
    figureNote: '这里取的是娱乐化、反串化和阴阳感，不是观点等同。',
    center: { economic: 46, governance: 62, social: 68, national: 48 },
  },
  {
    label: '神友观察员',
    emoji: '🔥',
    description:
      '你对现有秩序、主流民族叙事和温和改良都没什么信心。很多 2025 热点在你眼里不是偶发翻车，而是整个系统和叙事一起失效的又一次证据。',
    figureReferences: ['方脸'],
    figureNote: '这里取的是强烈反建制和反主流民族叙事气质，不代表观点完全一致。',
    center: { economic: 34, governance: 92, social: 82, national: 86 },
  },
  {
    label: '阶层焦虑者',
    emoji: '📱',
    description:
      '你对一切问题的感受，最后都会落回家世、门槛、机会和资源。你不一定最激进，但你会本能地追问：这事背后是不是又有普通人摸不到的通道？',
    figureReferences: ['户晨风'],
    figureNote: '气质参考，仅供娱乐，不代表观点完全一致。',
    center: { economic: 20, governance: 52, social: 56, national: 32 },
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
    figureReferences: bestArchetype.figureReferences,
    figureNote: bestArchetype.figureNote,
    dominantLeans,
  };
}

export function getIdeologyLabel(scores: ScoreMap): string {
  return getResultSummary(scores).label;
}
