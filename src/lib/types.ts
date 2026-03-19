export type DimensionId = string;

export interface Dimension {
  id: DimensionId;
  name: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
}

export interface Option {
  id: string;
  text: string;
  effect: Record<DimensionId, number>;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface TestConfig {
  title: string;
  description: string;
  dimensions: Dimension[];
  questions: Question[];
}

export type ScoreMap = Record<DimensionId, number>;

export interface DominantLean {
  dimensionId: DimensionId;
  dimensionName: string;
  score: number;
  directionLabel: string;
}

export interface ResultSummary {
  label: string;
  emoji: string;
  description: string;
  figureReferences: string[];
  figureNote: string;
  dominantLeans: DominantLean[];
}
