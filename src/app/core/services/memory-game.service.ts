import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { LevelConfig } from '../models/level-config.model';
import { MemoryCard } from '../models/memory-card.model';

@Injectable({
  providedIn: 'root',
})
export class MemoryGameService {
  createBoard(animals: Animal[], levelConfig: LevelConfig): MemoryCard[] {
    const selectedAnimals = animals.slice(0, levelConfig.animalCount);

    const animalCards: MemoryCard[] = selectedAnimals.flatMap((animal) => [
      {
        id: `${animal.id}-1`,
        type: 'animal',
        animalId: animal.id,
        icon: animal.icon,
        flipped: false,
        matched: false,
        hinted: false,
        swapped: false,
      },
      {
        id: `${animal.id}-2`,
        type: 'animal',
        animalId: animal.id,
        icon: animal.icon,
        flipped: false,
        matched: false,
        hinted: false,
        swapped: false,
      },
    ]);

    const bonusCards = this.createBonusCards(levelConfig.bonusCards);
    const mischiefCards = this.createMischiefCards(levelConfig.mischiefCards);

    return this.shuffle([...animalCards, ...bonusCards, ...mischiefCards]);
  }

  private createBonusCards(count: number): MemoryCard[] {
    return Array.from({ length: count }, (_, index) => ({
      id: `bonus-${index + 1}`,
      type: 'bonus' as const,
      icon: '🧰',
      flipped: false,
      matched: false,
      hinted: false,
      swapped: false,
      rewardCoins: 25,
    }));
  }

  private createMischiefCards(count: number): MemoryCard[] {
    return Array.from({ length: count }, (_, index) => ({
      id: `mischief-${index + 1}`,
      type: 'mischief' as const,
      icon: '🐙',
      flipped: false,
      matched: false,
      hinted: false,
      swapped: false,
    }));
  }

  private shuffle(cards: MemoryCard[]): MemoryCard[] {
    return [...cards].sort(() => Math.random() - 0.5);
  }
}