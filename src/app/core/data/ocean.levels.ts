import { LevelConfig } from "../models/level-config.model";

export const OCEAN_LEVELS: LevelConfig[] = [
  {
    levelNumber: 1,
    animalCount: 6, // 12 cards
    bonusCards: 0,
    mischiefCards: 0,
  },
  {
    levelNumber: 2,
    animalCount: 5, // 10 animals + 2 treasure = 12 cards
    bonusCards: 2,
    mischiefCards: 0,
  },
  {
    levelNumber: 3,
    animalCount: 5, // 10 animals + 1 treasure + 1 octopus = 12 cards
    bonusCards: 1,
    mischiefCards: 1,
  },
];