import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { LevelConfig } from '../models/level-config.model';
import { MemoryCard } from '../models/memory-card.model';

@Injectable({
  providedIn: 'root',
})
export class MemoryGameService {
  createBoard(
    animals: Animal[],
    levelConfig: LevelConfig,
    bonusIcon: string,
    mischiefIcon: string,
    bonusIcons: string[] = [bonusIcon],
    mischiefIcons: string[] = [mischiefIcon]
  ): MemoryCard[] {
    const selectedAnimals = this.shuffle(animals).slice(0, levelConfig.animalCount);

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

    const bonusCards = this.createBonusCards(levelConfig.bonusCards, bonusIcons);
    const mischiefCards = this.createMischiefCards(levelConfig.mischiefCards, mischiefIcons);

    return this.shuffle([...animalCards, ...bonusCards, ...mischiefCards]);
  }

  private createBonusCards(count: number, bonusIcons: string[]): MemoryCard[] {
    return Array.from({ length: count }, (_, index) => ({
      id: `bonus-${index + 1}`,
      type: 'bonus' as const,
      icon: this.pickRandom(bonusIcons),
      flipped: false,
      matched: false,
      hinted: false,
      swapped: false,
      rewardCoins: 25,
    }));
  }

  private createMischiefCards(count: number, mischiefIcons: string[]): MemoryCard[] {
    return Array.from({ length: count }, (_, index) => ({
      id: `mischief-${index + 1}`,
      type: 'mischief' as const,
      icon: this.pickRandom(mischiefIcons),
      flipped: false,
      matched: false,
      hinted: false,
      swapped: false,
    }));
  }

  private pickRandom(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }

  private shuffle<T>(items: T[]): T[] {
    return [...items].sort(() => Math.random() - 0.5);
  }
}