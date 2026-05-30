import { LevelConfig } from "../models/level-config.model";

export const FARM_LEVELS: LevelConfig[] = [
  {
    levelNumber: 1,
    animalCount: 5, // 10 animals + 2 treasure = 12 cards
    bonusCards: 2,
    mischiefCards: 0,
  },
  {
    levelNumber: 2,
    animalCount: 4, // 8 animals + 2 treasure + 2 octopus = 12 cards
    bonusCards: 2,
    mischiefCards: 2,
  },
];