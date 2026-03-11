import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { OCEAN_ANIMALS } from '../../../../core/data/ocean.animals';
import { OCEAN_LEVELS } from '../../../../core/data/ocean.levels';
import { MemoryCard as MemoryCardModel } from '../../../../core/models/memory-card.model';
import { MemoryGameService } from '../../../../core/services/memory-game.service';

import { MemoryCard } from '../../components/memory-card/memory-card';
import { ScoreBar } from '../../components/score-bar/score-bar';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, MemoryCard, ScoreBar],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage implements OnInit {
  cards: MemoryCardModel[] = [];
  currentLevel = 1;
  coins = 0;
  readonly matchReward = 2;

  private firstSelectedCard: MemoryCardModel | null = null;
  private secondSelectedCard: MemoryCardModel | null = null;
  private boardLocked = false;

  constructor(
    private memoryGameService: MemoryGameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupBoard();
  }

  setupBoard(): void {
    const levelConfig = OCEAN_LEVELS[this.currentLevel - 1];

    this.cards = this.memoryGameService.createBoard(
      OCEAN_ANIMALS,
      levelConfig
    );

    this.firstSelectedCard = null;
    this.secondSelectedCard = null;
    this.boardLocked = false;
    this.cdr.detectChanges();
  }

  onCardClicked(card: MemoryCardModel): void {
    if (this.boardLocked) {
      return;
    }

    if (card.flipped || card.matched) {
      return;
    }

    if (this.firstSelectedCard?.id === card.id) {
      return;
    }

    card.flipped = true;
    this.cdr.detectChanges();

    if (card.type !== 'animal') {
      return;
    }

    if (!this.firstSelectedCard) {
      this.firstSelectedCard = card;
      return;
    }

    this.secondSelectedCard = card;
    this.boardLocked = true;
    this.cdr.detectChanges();

    const firstCard = this.firstSelectedCard;
    const secondCard = this.secondSelectedCard;

    if (!firstCard || !secondCard) {
      this.resetTurn();
      this.cdr.detectChanges();
      return;
    }

    const isMatch = firstCard.animalId === secondCard.animalId;

    if (isMatch) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.coins += this.matchReward;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.resetTurn();
        this.checkWin();
        this.cdr.detectChanges();
      }, 500);

      return;
    }

    setTimeout(() => {
      firstCard.flipped = false;
      secondCard.flipped = false;
      this.resetTurn();
      this.cdr.detectChanges();
    }, 1000);
  }

  onHintClicked(): void {
    if (!this.canUseHint()) {
      return;
    }

    const hiddenAnimalCards = this.cards.filter(
      (card) => card.type === 'animal' && !card.flipped && !card.matched
    );

    const pairMap = new Map<string, MemoryCardModel[]>();

    for (const card of hiddenAnimalCards) {
      const key = card.animalId ?? '';
      const existingCards = pairMap.get(key) ?? [];
      existingCards.push(card);
      pairMap.set(key, existingCards);
    }

    const matchingPair = Array.from(pairMap.values()).find(
      (pair) => pair.length === 2
    );

    if (!matchingPair) {
      return;
    }

    this.boardLocked = true;

    const [firstHintCard, secondHintCard] = matchingPair;

    firstHintCard.flipped = true;
    secondHintCard.flipped = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      firstHintCard.flipped = false;
      secondHintCard.flipped = false;
      this.boardLocked = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  canUseHint(): boolean {
    if (this.boardLocked) {
      return false;
    }

    if (this.firstSelectedCard || this.secondSelectedCard) {
      return false;
    }

    const hiddenAnimalCards = this.cards.filter(
      (card) => card.type === 'animal' && !card.flipped && !card.matched
    );

    const pairCounts = new Map<string, number>();

    for (const card of hiddenAnimalCards) {
      const key = card.animalId ?? '';
      pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
    }

    return Array.from(pairCounts.values()).some((count) => count >= 2);
  }

  isBoardLocked(): boolean {
    return this.boardLocked;
  }

  trackByCard(index: number, card: MemoryCardModel): string {
    return card.id;
  }

  private resetTurn(): void {
    this.firstSelectedCard = null;
    this.secondSelectedCard = null;
    this.boardLocked = false;
  }

  private checkWin(): void {
    const allAnimalCardsMatched = this.cards
      .filter((card) => card.type === 'animal')
      .every((card) => card.matched);

    if (allAnimalCardsMatched) {
      setTimeout(() => {
        alert('Level complete!');
      }, 250);
    }
  }
}