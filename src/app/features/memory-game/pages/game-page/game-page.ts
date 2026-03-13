import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

import { WORLDS } from '../../../../core/data/worlds';
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
  currentWorldIndex = 0;
  currentLevel = 1;
  coins = 0;

  showLevelCompleteModal = false;
  showSpecialCardsIntroModal = false;
  showWorldCompleteModal = false;
  feedbackMessage = '';

  showPengBubble = false;
  showPhinBubble = false;
  currentPengSpeech = '';
  currentPhinSpeech = '';
  isPhoneView = false;

  readonly matchReward = 10;
  readonly hintCost = 20;
  readonly bonusReward = 25;

  private firstSelectedCardId: string | null = null;
  private secondSelectedCardId: string | null = null;
  private boardLocked = false;
  private speechSequenceId = 0;
  private feedbackTimeoutId: number | null = null;

  constructor(
    private memoryGameService: MemoryGameService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updateViewportMode();
    this.setupBoard();
  }

  @HostListener('window:resize')
  onResize(): void {
    const wasPhone = this.isPhoneView;
    this.updateViewportMode();

    if (wasPhone !== this.isPhoneView) {
      this.clearMascotBubbles();
      this.runIntroSpeech();
    }
  }

  get currentWorld() {
    return WORLDS[this.currentWorldIndex];
  }

  setupBoard(): void {
    const levelConfig = this.currentWorld.levels[this.currentLevel - 1];

    this.cards = this.memoryGameService.createBoard(
      this.currentWorld.animals,
      levelConfig,
      this.currentWorld.bonusIcon,
      this.currentWorld.mischiefIcon
    );

    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.boardLocked = false;

    this.showLevelCompleteModal = false;
    this.showSpecialCardsIntroModal = false;
    this.showWorldCompleteModal = false;
    this.feedbackMessage = '';

    this.clearMascotBubbles();
    this.cdr.detectChanges();

    void this.runIntroSpeech();
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

    this.setCardState(card.id, { flipped: true });
    this.cdr.detectChanges();

    if (card.type === 'bonus') {
      await this.handleBonusAsSecond(card.id);
      return;
    }

    if (card.type === 'mischief') {
      await this.handleMischiefAsSecond(card.id, firstSelectedCard.id);
      return;
    }

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

    this.showFeedback(this.currentWorld.messages.bonusFound);
    this.cdr.detectChanges();

    await this.sleep(700);

    this.boardLocked = false;
    this.cdr.detectChanges();
  }

  private async handleBonusAsSecond(cardId: string): Promise<void> {
    const firstCard = this.firstSelectedCardId
      ? this.findCardById(this.firstSelectedCardId)
      : null;
    const bonusCard = this.findCardById(cardId);

    if (!bonusCard) {
      return;
    }

    this.boardLocked = true;
    this.coins += bonusCard.rewardCoins ?? this.bonusReward;
    this.setCardState(cardId, { matched: true });

    this.showFeedback(this.currentWorld.messages.bonusFound);
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
      this.showFeedback(this.currentWorld.messages.mischiefFailed);
      this.boardLocked = false;
      this.cdr.detectChanges();
      return;
    }

    const randomIndex = Math.floor(Math.random() * hiddenCandidates.length);
    const targetCard = hiddenCandidates[randomIndex];

    this.swapCards(cardId, targetCard.id);
    this.setCardState(cardId, { swapped: true });
    this.setCardState(targetCard.id, { swapped: true });

    this.showFeedback(this.currentWorld.messages.mischiefSwapped);
    this.cdr.detectChanges();

    await this.sleep(1200);

    this.setCardState(cardId, { swapped: false });
    this.setCardState(targetCard.id, { swapped: false });

    this.boardLocked = false;
    this.cdr.detectChanges();
  }

  private async handleMischiefAsSecond(
    mischiefCardId: string,
    firstAnimalCardId: string
  ): Promise<void> {
    this.boardLocked = true;
    this.setCardState(mischiefCardId, { matched: true });
    this.cdr.detectChanges();

    await this.sleep(700);

    this.swapCards(mischiefCardId, firstAnimalCardId);
    this.setCardState(mischiefCardId, { swapped: true });
    this.setCardState(firstAnimalCardId, { swapped: true });

    this.showFeedback(this.currentWorld.messages.mischiefMovedCard);
    this.cdr.detectChanges();

    await this.sleep(1200);

    this.setCardState(mischiefCardId, { swapped: false });
    this.setCardState(firstAnimalCardId, {
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

    if (this.currentLevel < this.currentWorld.levels.length) {
      this.currentLevel++;
      this.setupBoard();
    }

    this.cdr.detectChanges();
  }

  continueToSpecialCardsLevel(): void {
    this.showSpecialCardsIntroModal = false;

    if (this.currentLevel < this.currentWorld.levels.length) {
      this.currentLevel++;
      this.setupBoard();
    }

    this.cdr.detectChanges();
  }

  goToNextWorld(): void {
    this.showWorldCompleteModal = false;

    if (this.currentWorldIndex < WORLDS.length - 1) {
      this.currentWorldIndex++;
      this.currentLevel = 1;
      this.setupBoard();
      this.showFeedback(this.currentWorld.messages.welcome);
    } else {
      this.showFeedback('🏆 You finished all available worlds!');
    }

    this.cdr.detectChanges();
  }

  private updateViewportMode(): void {
    this.isPhoneView = window.innerWidth <= 700;
  }

  private clearMascotBubbles(): void {
    this.showPengBubble = false;
    this.showPhinBubble = false;
    this.currentPengSpeech = '';
    this.currentPhinSpeech = '';
  }

  private async runIntroSpeech(): Promise<void> {
    this.speechSequenceId += 1;
    const sequenceId = this.speechSequenceId;

    this.clearMascotBubbles();
    this.clearFeedbackMessage();

    const pengText = this.currentWorld.mascotMessages.peng;
    const phinText = this.currentWorld.mascotMessages.phin;

    if (this.isPhoneView) {
      this.showFeedback(`🐧 Peng: ${pengText}`, 1800);
      this.cdr.detectChanges();

      await this.sleep(2100);

      if (sequenceId !== this.speechSequenceId) {
        return;
      }

      this.showFeedback(`🐬 Phin: ${phinText}`, 1800);
      this.cdr.detectChanges();
      return;
    }

    this.currentPengSpeech = pengText;
    this.showPengBubble = true;
    this.cdr.detectChanges();

    await this.sleep(1800);

    if (sequenceId !== this.speechSequenceId) {
      return;
    }

    this.showPengBubble = false;
    this.currentPengSpeech = '';
    this.cdr.detectChanges();

    await this.sleep(250);

    if (sequenceId !== this.speechSequenceId) {
      return;
    }

    this.currentPhinSpeech = phinText;
    this.showPhinBubble = true;
    this.cdr.detectChanges();

    await this.sleep(1800);

    if (sequenceId !== this.speechSequenceId) {
      return;
    }

    this.showPhinBubble = false;
    this.currentPhinSpeech = '';
    this.cdr.detectChanges();
  }

  private clearFeedbackMessage(): void {
    if (this.feedbackTimeoutId !== null) {
      clearTimeout(this.feedbackTimeoutId);
      this.feedbackTimeoutId = null;
    }

    this.feedbackMessage = '';
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
      } else if (this.currentLevel === this.currentWorld.levels.length) {
        this.showWorldCompleteModal = true;
      } else {
        this.showLevelCompleteModal = true;
      }

      this.cdr.detectChanges();
    }, 300);
  }

  private showFeedback(message: string, duration = 1800): void {
    this.clearFeedbackMessage();
    this.feedbackMessage = message;

    this.feedbackTimeoutId = window.setTimeout(() => {
      if (this.feedbackMessage === message) {
        this.feedbackMessage = '';
        this.cdr.detectChanges();
      }
      this.feedbackTimeoutId = null;
    }, duration);
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