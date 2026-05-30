import { describe, expect, it } from 'vitest';

import { MemoryGameService } from './memory-game.service';
import { Animal } from '../models/animal.model';
import { LevelConfig } from '../models/level-config.model';

describe('MemoryGameService', () => {
  const service = new MemoryGameService();

  const animals: Animal[] = [
    {
      id: 'fish',
      nameEn: 'Fish',
      nameBg: 'Риба',
      icon: 'fish.png',
      introductionEn: "I'm a fish!",
      introductionBg: 'Аз съм риба!',
    },
    {
      id: 'crab',
      nameEn: 'Crab',
      nameBg: 'Рак',
      icon: 'crab.png',
      introductionEn: "I'm a crab!",
      introductionBg: 'Аз съм рак!',
    },
    {
      id: 'turtle',
      nameEn: 'Turtle',
      nameBg: 'Костенурка',
      icon: 'turtle.png',
      introductionEn: "I'm a turtle!",
      introductionBg: 'Аз съм костенурка!',
    },
    {
      id: 'duck',
      nameEn: 'Duck',
      nameBg: 'Патица',
      icon: 'duck.png',
      introductionEn: "I'm a duck!",
      introductionBg: 'Аз съм патица!',
    },
    {
      id: 'sheep',
      nameEn: 'Sheep',
      nameBg: 'Овца',
      icon: 'sheep.png',
      introductionEn: "I'm a sheep!",
      introductionBg: 'Аз съм овца!',
    },
  ];

  it('should create a board with animal pairs, bonus cards, and mischief cards', () => {
    const levelConfig: LevelConfig = {
      levelNumber: 1,
      animalCount: 5,
      bonusCards: 2,
      mischiefCards: 1,
    };

    const cards = service.createBoard(
      animals,
      levelConfig,
      'treasure.png',
      'octopus.png'
    );

    expect(cards.length).toBe(13);

    expect(cards.filter((card) => card.type === 'animal').length).toBe(10);
    expect(cards.filter((card) => card.type === 'bonus').length).toBe(2);
    expect(cards.filter((card) => card.type === 'mischief').length).toBe(1);
  });

  it('should create two animal cards for each selected animal', () => {
    const levelConfig: LevelConfig = {
      levelNumber: 1,
      animalCount: 3,
      bonusCards: 0,
      mischiefCards: 0,
    };

    const cards = service.createBoard(
      animals,
      levelConfig,
      'treasure.png',
      'octopus.png'
    );

    const animalCards = cards.filter((card) => card.type === 'animal');

    expect(animalCards.length).toBe(6);

    const countsByAnimalId = animalCards.reduce<Record<string, number>>(
      (acc, card) => {
        if (!card.animalId) {
          return acc;
        }

        acc[card.animalId] = (acc[card.animalId] ?? 0) + 1;
        return acc;
      },
      {}
    );

    Object.values(countsByAnimalId).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  it('should create cards face down and unmatched', () => {
    const levelConfig: LevelConfig = {
      levelNumber: 1,
      animalCount: 2,
      bonusCards: 1,
      mischiefCards: 1,
    };

    const cards = service.createBoard(
      animals,
      levelConfig,
      'treasure.png',
      'octopus.png'
    );

    cards.forEach((card) => {
      expect(card.flipped).toBe(false);
      expect(card.matched).toBe(false);
    });
  });
});