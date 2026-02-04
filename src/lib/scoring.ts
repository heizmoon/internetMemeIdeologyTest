import { Axis, Question } from './types';

// Initial score is 50 (Center)
const INITIAL_SCORE = 50;
const MAX_SCORE = 100;
const MIN_SCORE = 0;

export function calculateScore(answers: Record<string, string>, questions: Question[]) {
    const scores: Record<Axis, number> = {
        economic: INITIAL_SCORE,
        cultural: INITIAL_SCORE,
        national: INITIAL_SCORE,
        environmental: INITIAL_SCORE
    };

    questions.forEach((q) => {
        const selectedOptionId = answers[q.id];
        if (!selectedOptionId) return;

        const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
        if (!selectedOption) return;

        Object.entries(selectedOption.effect).forEach(([axis, change]) => {
            if (typeof change === 'number') {
                scores[axis as Axis] += change;
            }
        });
    });

    // Clamp scores
    (Object.keys(scores) as Axis[]).forEach(axis => {
        scores[axis] = Math.max(MIN_SCORE, Math.min(MAX_SCORE, scores[axis]));
    });

    return scores;
}

export function getIdeologyLabel(scores: Record<Axis, number>): string {
    const eco = scores.economic; // 0 (Left/Public) - 100 (Right/Market)
    const cul = scores.cultural; // 0 (Trad/Auth) - 100 (Prog/Lib)
    const nat = scores.national; // 0 (National/Pro-China) - 100 (Global/Pro-West)
    const env = scores.environmental; // 0 (Stability/Order) - 100 (Chaos/Accel)

    // --- 特殊状态判别 (High Priority) ---

    // 1. 乐子人/加速党 (High Chaos)
    if (env > 75) return "乐子人 / 加速主义者 (Doomer/Accel)";

    // 2. 传统建制派 (High National + Stability)
    if (nat < 30 && env < 40) {
        if (eco < 40) return "红色卫士 / 工业党 (Auth-Left)";
        if (cul < 30) return "建制皇汉 / 传统保皇派 (Trad-Nat)";
        return "爱国青年 / 兔友 (Rabbit)";
    }

    // 3. 皇汉与伪史论 (High National, but maybe Chaos/Critical of Gov Cultural policy)
    if (nat < 20 && cul < 40) return "极端皇汉 / 1644史观持有者";

    // 4. 神神/反建制 (High Global + Chaos or Lib)
    if (nat > 70) {
        if (env > 60) return "神神 / 浪人 (Radical Anti-Establishment)";
        if (eco > 60) return "高华 / 润学大师 (Global Elite)";
        return "自由世界主义者 (Cosmopolitan)";
    }

    // --- 左右政治光谱 (Standard) ---

    // 5. 左翼光谱
    if (eco < 30) {
        if (cul > 60) return "新左派 / 进步左翼 (Prog-Left)"; // Feminist, Anti-Tradition, Pro-Equality
        if (cul < 40) return "托派 / 激进马克思主义 (Radical Left)";
        return "网左 / 泛左翼 (Online Leftist)";
    }

    // 6. 右翼光谱
    if (eco > 70) {
        if (cul > 60) return "自由意志主义 (Libertarian)"; // Free Market, Free Social
        if (cul < 40) return "新保守主义 / 精英右派 (Neo-Con)";
        return "市场自由派 (Market Liberal)";
    }

    // --- 社会阶层/消费观念 (Based on "Android vs Apple" Theory implictly) ---
    // Mid-range ideologies
    if (eco > 60 && nat < 50) return "苹果人 / 现充中产 (Establishment Elite)"; // Pro-Market, Pro-China-ish
    if (eco < 40 && nat > 50) return "安卓人 / 觉醒底层 (Disillusioned Class)"; // Pro-Equality, Anti-Nationalist? Maybe.

    // 7. 中间派
    if (env < 30) return "岁月静好 / 日子人 (Normie)";
    return "吃瓜群众 / 键政观察员 (Centrist)";
}
