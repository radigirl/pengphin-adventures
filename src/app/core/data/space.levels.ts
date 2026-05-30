import { LevelConfig } from "../models/level-config.model";

export const SPACE_LEVELS: LevelConfig[] = [
  {
    levelNumber: 1,
    animalCount: 9, // 18 animals + 1 treasure + 1 octopus = 20 cards
    bonusCards: 1,
    mischiefCards: 1,
  },
  {
    levelNumber: 2,
    animalCount: 8, // 16 animals + 2 treasure + 2 octopus = 20 cards
    bonusCards: 2,
    mischiefCards: 2,
  },
];