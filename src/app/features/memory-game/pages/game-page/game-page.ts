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

  showLevelCompleteModal = false;
  showSpecialCardsIntroModal = false;
  showWorldCompleteModal = false;
  feedbackMessage = '';

  readonly matchReward = 10;
  readonly hintCost = 20;
  readonly bonusReward = 25;

  private firstSelectedCardId: string | null = null;
  private secondSelectedCardId: string | null = null;
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

    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.boardLocked = false;

    this.showLevelCompleteModal = false;
    this.showSpecialCardsIntroModal = false;
    this.showWorldCompleteModal = false;
    this.feedbackMessage = '';

    this.cdr.detectChanges();
  }

  async onCardClicked(card: MemoryCardModel): Promise<void> {
    if (this.boardLocked) {
      return;
    }

    if (card.flipped || card.matched) {
      return;
    }

    if (this.firstSelectedCardId === card.id) {
      return;
    }

    const firstSelectedCard = this.firstSelectedCardId
      ? this.findCardById(this.firstSelectedCardId)
      : null;

    // First click in a turn
    if (!firstSelectedCard) {
      this.setCardState(card.id, { flipped: true });
      this.cdr.detectChanges();

      if (card.type === 'bonus') {
        await this.handleBonusAsFirst(card.id);
        return;
      }

      if (card.type === 'mischief') {
        await this.handleMischiefAsFirst(card.id);
        return;
      }

      this.firstSelectedCardId = card.id;
      return;
    }

    // Second click in a turn
    this.setCardState(card.id, { flipped: true });
    this.cdr.detectChanges();

    // Animal -> Treasure
    if (card.type === 'bonus') {
      await this.handleBonusAsSecond(card.id);
      return;
    }

    // Animal -> Octopus
    if (card.type === 'mischief') {
      await this.handleMischiefAsSecond(card.id, firstSelectedCard.id);
      return;
    }

    // Animal -> Animal normal behavior
    this.secondSelectedCardId = card.id;
    this.boardLocked = true;
    this.cdr.detectChanges();

    const secondSelectedCard = this.findCardById(card.id);

    if (!secondSelectedCard) {
      this.resetTurn();
      this.cdr.detectChanges();
      return;
    }

    const isMatch = firstSelectedCard.animalId === secondSelectedCard.animalId;

    if (isMatch) {
      this.setCardState(firstSelectedCard.id, { matched: true });
      this.setCardState(secondSelectedCard.id, { matched: true });
      this.coins += this.matchReward;

      this.showFeedback(`✅ Match! +${this.matchReward} coins`);
      this.cdr.detectChanges();

      await this.sleep(500);

      this.resetTurn();
      this.checkWin();
      this.cdr.detectChanges();
      return;
    }

    await this.sleep(1000);

    this.setCardState(firstSelectedCard.id, { flipped: false });
    this.setCardState(secondSelectedCard.id, { flipped: false });

    this.resetTurn();
    this.cdr.detectChanges();
  }

  private async handleBonusAsFirst(cardId: string): Promise<void> {
    const card = this.findCardById(cardId);
    if (!card) {
      return;
    }

    this.boardLocked = true;
    this.coins += card.rewardCoins ?? this.bonusReward;
    this.setCardState(cardId, { matched: true });

    this.showFeedback(
      `🎉 Treasure found! +${card.rewardCoins ?? this.bonusReward} coins`
    );
    this.cdr.detectChanges();

    await this.sleep(700);

    this.boardLocked = false;
    this.cdr.detectChanges();
  }

  private async handleBonusAsSecond(cardId: string): Promise<void> {
    const firstCard = this.firstSelectedCardId
      ? this.findCardById(this.firstSelectedCardId)
      : null;
    const treasureCard = this.findCardById(cardId);

    if (!treasureCard) {
      return;
    }

    this.boardLocked = true;
    this.coins += treasureCard.rewardCoins ?? this.bonusReward;
    this.setCardState(cardId, { matched: true });

    this.showFeedback(
      `🎉 Treasure found! +${treasureCard.rewardCoins ?? this.bonusReward} coins`
    );
    this.cdr.detectChanges();

    await this.sleep(700);

    if (firstCard) {
      this.setCardState(firstCard.id, { flipped: false });
    }

    this.resetTurn();
    this.cdr.detectChanges();
  }

  private async handleMischiefAsFirst(cardId: string): Promise<void> {
    this.boardLocked = true;
    this.setCardState(cardId, { matched: true });
    this.cdr.detectChanges();

    await this.sleep(700);

    const hiddenCandidates = this.cards.filter(
      (c) => c.id !== cardId && !c.flipped && !c.matched
    );

    if (hiddenCandidates.length < 1) {
      this.showFeedback('🐙 Octopus looked around… but nothing could be swapped!');
      this.boardLocked = false;
      this.cdr.detectChanges();
      return;
    }

    const randomIndex = Math.floor(Math.random() * hiddenCandidates.length);
    const targetCard = hiddenCandidates[randomIndex];

    this.swapCards(cardId, targetCard.id);
    this.setCardState(cardId, { swapped: true });
    this.setCardState(targetCard.id, { swapped: true });

    this.showFeedback('🐙 Octopus mischief! Cards swapped!');
    this.cdr.detectChanges();

    await this.sleep(1200);

    this.setCardState(cardId, { swapped: false });
    this.setCardState(targetCard.id, { swapped: false });

    this.boardLocked = false;
    this.cdr.detectChanges();
  }

  private async handleMischiefAsSecond(
  octopusId: string,
  firstAnimalId: string
): Promise<void> {
  this.boardLocked = true;
  this.setCardState(octopusId, { matched: true });
  this.cdr.detectChanges();

  await this.sleep(700);

  this.swapCards(octopusId, firstAnimalId);
  this.setCardState(octopusId, { swapped: true });
  this.setCardState(firstAnimalId, { swapped: true });

  this.showFeedback('🐙 Octopus moved your card!');
  this.cdr.detectChanges();

  await this.sleep(1200);

  this.setCardState(octopusId, { swapped: false });
  this.setCardState(firstAnimalId, {
    swapped: false,
    flipped: false,
  });

  this.resetTurn();
  this.cdr.detectChanges();
}

  onHintClicked(): void {
    if (!this.canUseHint()) {
      return;
    }

    this.coins -= this.hintCost;

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

    this.setCardState(firstHintCard.id, { flipped: true, hinted: true });
    this.setCardState(secondHintCard.id, { flipped: true, hinted: true });

    this.showFeedback(`💡 Hint used (-${this.hintCost} coins)`);
    this.cdr.detectChanges();

    setTimeout(() => {
      this.setCardState(firstHintCard.id, { flipped: false, hinted: false });
      this.setCardState(secondHintCard.id, { flipped: false, hinted: false });
      this.boardLocked = false;
      this.cdr.detectChanges();
    }, 1100);
  }

  canUseHint(): boolean {
    if (this.boardLocked) {
      return false;
    }

    if (this.firstSelectedCardId || this.secondSelectedCardId) {
      return false;
    }

    if (this.coins < this.hintCost) {
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

  goToNextLevel(): void {
    this.showLevelCompleteModal = false;

    if (this.currentLevel < OCEAN_LEVELS.length) {
      this.currentLevel++;
      this.setupBoard();
    }

    this.cdr.detectChanges();
  }

  continueToSpecialCardsLevel(): void {
    this.showSpecialCardsIntroModal = false;

    if (this.currentLevel < OCEAN_LEVELS.length) {
      this.currentLevel++;
      this.setupBoard();
    }

    this.cdr.detectChanges();
  }

  goToNextWorld(): void {
    this.showWorldCompleteModal = false;
    this.showFeedback('🌍 New world coming next!');
    this.cdr.detectChanges();
  }

  private resetTurn(): void {
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.boardLocked = false;
  }

  private checkWin(): void {
    const allAnimalCardsMatched = this.cards
      .filter((card) => card.type === 'animal')
      .every((card) => card.matched);

    if (!allAnimalCardsMatched) {
      return;
    }

    setTimeout(() => {
      if (this.currentLevel === 2) {
        this.showSpecialCardsIntroModal = true;
      } else if (this.currentLevel === OCEAN_LEVELS.length) {
        this.showWorldCompleteModal = true;
      } else {
        this.showLevelCompleteModal = true;
      }

      this.cdr.detectChanges();
    }, 300);
  }

  private showFeedback(message: string): void {
    this.feedbackMessage = message;

    setTimeout(() => {
      if (this.feedbackMessage === message) {
        this.feedbackMessage = '';
        this.cdr.detectChanges();
      }
    }, 1800);
  }

  private setCardState(
    cardId: string,
    changes: Partial<MemoryCardModel>
  ): void {
    this.cards = this.cards.map((card) =>
      card.id === cardId ? { ...card, ...changes } : card
    );
  }

  private swapCards(firstId: string, secondId: string): void {
    const firstIndex = this.cards.findIndex((c) => c.id === firstId);
    const secondIndex = this.cards.findIndex((c) => c.id === secondId);

    if (firstIndex === -1 || secondIndex === -1) {
      return;
    }

    const newCards = [...this.cards];
    [newCards[firstIndex], newCards[secondIndex]] = [
      newCards[secondIndex],
      newCards[firstIndex],
    ];

    this.cards = newCards;
  }

  private findCardById(cardId: string): MemoryCardModel | undefined {
    return this.cards.find((card) => card.id === cardId);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}