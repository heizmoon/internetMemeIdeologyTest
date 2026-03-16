import rawConfig from '@/data/ideology-config.json';
import { TestConfig } from '@/lib/types';

const testConfig = rawConfig as TestConfig;

function validateConfig(config: TestConfig): void {
  const dimensionIds = new Set<string>();

  config.dimensions.forEach((dimension) => {
    if (dimensionIds.has(dimension.id)) {
      throw new Error(`Duplicate dimension id: ${dimension.id}`);
    }

    dimensionIds.add(dimension.id);
  });

  config.questions.forEach((question) => {
    const optionIds = new Set<string>();

    question.options.forEach((option) => {
      if (optionIds.has(option.id)) {
        throw new Error(`Duplicate option id \"${option.id}\" in question \"${question.id}\"`);
      }

      optionIds.add(option.id);

      Object.keys(option.effect).forEach((effectDimensionId) => {
        if (!dimensionIds.has(effectDimensionId)) {
          throw new Error(
            `Question \"${question.id}\" option \"${option.id}\" references unknown dimension \"${effectDimensionId}\"`
          );
        }
      });
    });
  });
}

validateConfig(testConfig);

export const TEST_CONFIG = testConfig;
export const DIMENSIONS = TEST_CONFIG.dimensions;
export const QUESTIONS = TEST_CONFIG.questions;
