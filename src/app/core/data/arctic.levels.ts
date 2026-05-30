import { LevelConfig } from "../models/level-config.model";

export const ARCTIC_LEVELS: LevelConfig[] = [
  {
    levelNumber: 1,
    animalCount: 7, // 14 animals + 1 treasure + 1 octopus = 16 cards
    bonusCards: 1,
    mischiefCards: 1,
  },
  {
    levelNumber: 2,
    animalCount: 6, // 12 animals + 2 treasure + 2 octopus = 16 cards
    bonusCards: 2,
    mischiefCards: 2,
  },
];