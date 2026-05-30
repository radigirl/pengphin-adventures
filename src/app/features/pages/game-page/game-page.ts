import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

import { WORLDS } from '../../../core/data/worlds';
import { MemoryCard as MemoryCardModel } from '../../../core/models/memory-card.model';
import { MemoryGameService } from '../../../core/services/memory-game.service';

import { MemoryCard } from '../../components/memory-card/memory-card';
import { ScoreBar } from '../../components/score-bar/score-bar';
import { WelcomeScreen } from '../../components/welcome-screen/welcome-screen';
import { LanguageService } from '../../../core/services/language.service';
import { AudioService } from '../../../core/services/audio.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { Snackbar } from '../../../shared/components/snackbar/snackbar';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule,
    MemoryCard,
    ScoreBar,
    WelcomeScreen,
    TranslatePipe,
    Snackbar
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage implements OnInit {
  welcomePeng = 'assets/mascots/peng-home-small.png';
  welcomePhin = 'assets/mascots/phin-home-small.png';

  cards: MemoryCardModel[] = [];
  currentWorldIndex = 0;
  currentLevel = 1;
  coins = 0;

  showStartScreen = true;

  showLevelCompleteModal = false;
  showSpecialCardsIntroModal = false;
  showWorldCompleteModal = false;
  feedbackMessage = '';

  showPengBubble = false;
  showPhinBubble = false;
  currentPengSpeech = '';
  currentPhinSpeech = '';
  activeMobileSpeaker: 'peng' | 'phin' | null = null;
  isPhoneView = false;

  readonly matchReward = 10;
  readonly hintCost = 20;
  readonly bonusReward = 25;

  private readonly PHONE_MAX_WIDTH = 767;
  private readonly DESKTOP_MIN_WIDTH = 1260;

  private firstSelectedCardId: string | null = null;
  private secondSelectedCardId: string | null = null;
  private boardLocked = false;
  private feedbackTimeoutId: number | null = null;

  private hintInProgress = false;
  private lastHintedAnimalId: string | null = null;

  private boardSessionId = 0;

  showUpdateSnackbar = false;

  constructor(
    private memoryGameService: MemoryGameService,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService,
    private audioService: AudioService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    this.updateViewportMode();
    this.preloadWorldBackgrounds();
    this.listenForAppUpdates();
  }

  @HostListener('window:resize')
  onResize(): void {
    const wasPhone = this.isPhoneView;
    this.updateViewportMode();

    if (!this.showStartScreen && wasPhone !== this.isPhoneView) {
      this.clearMascotBubbles();
    }
  }

  get currentWorld() {
    return WORLDS[this.currentWorldIndex];
  }

  getGlobalLevel(): number {
    const levelsBefore = WORLDS
      .slice(0, this.currentWorldIndex)
      .reduce((sum, world) => sum + world.levels.length, 0);

    return levelsBefore + this.currentLevel;
  }

  get currentLanguage(): 'en' | 'bg' {
    return this.languageService.getLanguage();
  }

  private localize(text: { en: string; bg: string }): string {
    return text[this.currentLanguage];
  }

  startAdventure(): void {
    this.showStartScreen = false;
    this.setupBoard();
    this.cdr.detectChanges();
  }

  private preloadWorldBackgrounds(): void {
    WORLDS.forEach((world) => {
      const image = new Image();
      image.src = world.backgroundImage;
    });
  }

  get isPhoneLandscape(): boolean {
    return (
      window.innerHeight <= 500 &&
      window.innerWidth > window.innerHeight
    );
  }

  get isPhonePortrait(): boolean {
    return (
      window.innerWidth <= this.PHONE_MAX_WIDTH &&
      window.innerHeight > window.innerWidth
    );
  }

  get hasLargePhoneBoard(): boolean {
    return (
      this.isPhonePortrait &&
      this.cards.length >= 16
    );
  }

  get boardColumns(): number {
    const cardCount = this.cards.length;
    const width = window.innerWidth;

    if (this.isPhoneLandscape) {
      if (cardCount <= 12) return 4;
      if (cardCount <= 16) return 4;
      if (cardCount <= 20) return 5;
      return 6;
    }

    if (width <= this.PHONE_MAX_WIDTH) {
      if (cardCount <= 12) return 3;
      return 4;
    }

    if (cardCount <= 16) return 4;
    if (cardCount <= 20) return 5;
    return 6;
  }

  get boardRows(): number {
    return Math.ceil(this.cards.length / this.boardColumns);
  }

  get boardGap(): number {
    const width = window.innerWidth;

    if (this.isPhoneLandscape) {
      return 8;
    }

    if (width <= this.PHONE_MAX_WIDTH) {
      return this.boardRows >= 8 ? 8 : 10;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return this.boardRows >= 6 ? 10 : 12;
    }

    return this.boardRows >= 6 ? 10 : 16;
  }

  get boardPadding(): number {
    const width = window.innerWidth;

    if (this.isPhoneLandscape) {
      return 8;
    }

    if (width <= this.PHONE_MAX_WIDTH) {
      return 10;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return this.boardRows >= 6 ? 12 : 14;
    }

    return this.boardRows >= 6 ? 12 : 18;
  }

  get playAreaGap(): number {
    if (this.isPhoneLandscape) {
      return 10;
    }

    const width = window.innerWidth;

    if (width <= this.PHONE_MAX_WIDTH) {
      return 0;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return this.boardRows >= 6 ? 8 : 10;
    }

    return this.boardRows >= 6 ? 18 : 24;
  }

  get mascotSideWidth(): number {
    if (this.isPhoneLandscape) {
      return 120;
    }

    const width = window.innerWidth;

    if (width <= this.PHONE_MAX_WIDTH) {
      return 0;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return this.boardRows >= 6 ? 140 : 180;
    }

    return this.boardRows >= 6 ? 170 : 210;
  }

  get mascotSize(): number {
    if (this.isPhoneLandscape) {
      return 150;
    }

    const width = window.innerWidth;

    if (width <= this.PHONE_MAX_WIDTH) {
      return 0;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return this.boardRows >= 6 ? 200 : 240;
    }

    return this.boardRows >= 6 ? 220 : 270;
  }

  get boardCardSize(): number {
    const columns = this.boardColumns;
    const rows = this.boardRows;
    const gap = this.boardGap;
    const padding = this.boardPadding;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const availableWidth = this.getAvailableBoardWidth(viewportWidth);
    const availableHeight = this.getAvailableBoardHeight(viewportHeight);

    const maxCardWidth =
      (availableWidth - padding * 2 - gap * (columns - 1)) / columns;

    const maxCardHeight =
      (availableHeight - padding * 2 - gap * (rows - 1)) / rows;

    const rawSize = Math.floor(Math.min(maxCardWidth, maxCardHeight));
    const width = window.innerWidth;

    if (this.isPhoneLandscape) {
      return Math.max(34, Math.min(rawSize, 54));
    }

    if (width <= this.PHONE_MAX_WIDTH) {
      return Math.max(50, Math.min(rawSize, 80));
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return Math.max(64, Math.min(rawSize, 120));
    }

    return Math.max(62, Math.min(rawSize, 132));
  }

  private getAvailableBoardWidth(viewportWidth: number): number {
    const width = window.innerWidth;

    if (width <= this.PHONE_MAX_WIDTH) {
      return viewportWidth - 20;
    }

    const horizontalPadding = 32;
    const sideMascots = this.mascotSideWidth * 2;
    const gaps = this.playAreaGap * 2;

    return viewportWidth - horizontalPadding - sideMascots - gaps;
  }

  private getAvailableBoardHeight(viewportHeight: number): number {
    const width = window.innerWidth;

    if (this.isPhoneLandscape) {
      return viewportHeight - 125;
    }

    if (width <= this.PHONE_MAX_WIDTH) {
      return viewportHeight - 220;
    }

    if (width < this.DESKTOP_MIN_WIDTH) {
      return viewportHeight - 200;
    }

    return viewportHeight - 250;
  }

  get isCompactMobileLayout(): boolean {
    return this.isPhoneView && this.boardRows >= 6;
  }

  setupBoard(): void {
    this.boardSessionId++;

    const sessionId = this.boardSessionId;

    this.cards = [];
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.boardLocked = true;
    this.hintInProgress = false;

    this.showLevelCompleteModal = false;
    this.showSpecialCardsIntroModal = false;
    this.showWorldCompleteModal = false;
    this.feedbackMessage = '';

    this.clearMascotBubbles();
    this.cdr.detectChanges();

    window.setTimeout(() => {
      if (this.isOldBoard(sessionId)) {
        return;
      }

      const levelConfig = this.currentWorld.levels[this.currentLevel - 1];

      this.cards = this.memoryGameService.createBoard(
        this.currentWorld.animals,
        levelConfig,
        this.currentWorld.bonusIcon,
        this.currentWorld.mischiefIcon,
        this.currentWorld.bonusIconPool,
        this.currentWorld.mischiefIconPool
      );

      window.setTimeout(() => {
        if (this.isOldBoard(sessionId)) {
          return;
        }

        this.boardLocked = false;
        this.cdr.detectChanges();
      }, 300);

      this.cdr.detectChanges();
    }, 0);
  }

  async onCardClicked(card: MemoryCardModel, event?: MouseEvent): Promise<void> {
    const sessionId = this.boardSessionId;

    if (card.flipped || card.matched) {
      event?.stopPropagation();

      if (card.type === 'animal' && card.animalId) {
        const animal = this.currentWorld.animals.find(
          (item) => item.id === card.animalId
        );

        if (animal) {
          const animalName =
            this.currentLanguage === 'bg'
              ? animal.nameBg
              : animal.nameEn;

          const intro =
            this.currentLanguage === 'bg'
              ? animal.introductionBg
              : animal.introductionEn;

          const audioPath =
            this.currentLanguage === 'bg'
              ? animal.audioBg
              : animal.audioEn;

          this.showFeedback(`${animalName}: ${intro}`, 2600);

          if (audioPath) {
            this.audioService.play(audioPath);
          }
        }
      }

      if (card.type === 'mischief') {
        const mischiefName =
          this.currentWorld.mischiefName[this.currentLanguage];

        const message =
          this.currentWorld.mischiefMessage?.[this.currentLanguage];

        const audioPath =
          this.currentWorld.mischiefAudio?.[this.currentLanguage];

        if (message) {
          this.showFeedback(`${mischiefName}: ${message}`, 2600);
        }

        if (audioPath) {
          this.audioService.play(audioPath);
        }
      }

      return;
    }

    if (this.boardLocked) {
      return;
    }

    if (this.firstSelectedCardId === card.id) {
      return;
    }
    this.lastHintedAnimalId = null;

    const firstSelectedCard = this.firstSelectedCardId
      ? this.findCardById(this.firstSelectedCardId)
      : null;

    if (!firstSelectedCard) {
      this.setCardState(card.id, { flipped: true });
      this.cdr.detectChanges();

      if (card.type === 'bonus') {
        await this.handleBonusAsFirst(card.id, sessionId);
        return;
      }

      if (card.type === 'mischief') {
        await this.handleMischiefAsFirst(card.id, sessionId);
        return;
      }

      this.firstSelectedCardId = card.id;
      return;
    }

    this.setCardState(card.id, { flipped: true });
    this.cdr.detectChanges();

    if (card.type === 'bonus') {
      await this.handleBonusAsSecond(card.id, sessionId);
      return;
    }

    if (card.type === 'mischief') {
      await this.handleMischiefAsSecond(card.id, firstSelectedCard.id, sessionId);
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

      this.showFeedback(
        this.currentLanguage === 'bg'
          ? `✅ Съвпадение! +${this.matchReward} монети`
          : `✅ Match! +${this.matchReward} coins`
      );
      this.cdr.detectChanges();

      await this.sleep(500);

      if (sessionId !== this.boardSessionId) {
        return;
      }

      this.resetTurn();
      this.checkWin();
      this.cdr.detectChanges();
      return;
    }

    await this.sleep(1000);

    if (sessionId !== this.boardSessionId) {
      return;
    }

    this.setCardState(firstSelectedCard.id, { flipped: false });
    this.setCardState(secondSelectedCard.id, { flipped: false });

    this.resetTurn();
    this.cdr.detectChanges();
  }

  private async handleBonusAsFirst(cardId: string, sessionId: number): Promise<void> {
    const card = this.findCardById(cardId);
    if (!card) {
      return;
    }

    this.boardLocked = true;
    this.coins += card.rewardCoins ?? this.bonusReward;
    this.setCardState(cardId, { matched: true });

    this.showFeedback(this.localize(this.currentWorld.messages.bonusFound));
    this.cdr.detectChanges();

    await this.sleep(700);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    this.boardLocked = false;
    this.checkWin();
    this.cdr.detectChanges();
  }

  private async handleBonusAsSecond(cardId: string, sessionId: number): Promise<void> {
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

    this.showFeedback(this.localize(this.currentWorld.messages.bonusFound));
    this.cdr.detectChanges();

    await this.sleep(700);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    if (firstCard) {
      this.setCardState(firstCard.id, { flipped: false });
    }

    this.resetTurn();
    this.checkWin();
    this.cdr.detectChanges();
  }

  private async handleMischiefAsFirst(cardId: string, sessionId: number): Promise<void> {
    this.boardLocked = true;
    this.setCardState(cardId, { matched: true });
    this.cdr.detectChanges();

    await this.sleep(700);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    const hiddenCandidates = this.cards.filter(
      (c) => c.id !== cardId && !c.flipped && !c.matched
    );

    if (hiddenCandidates.length < 1) {
      this.showFeedback(this.localize(this.currentWorld.messages.mischiefFailed));
      this.boardLocked = false;
      this.checkWin();
      this.cdr.detectChanges();
      return;
    }

    const randomIndex = Math.floor(Math.random() * hiddenCandidates.length);
    const targetCard = hiddenCandidates[randomIndex];

    this.swapCards(cardId, targetCard.id);
    this.setCardState(cardId, { swapped: true });
    this.setCardState(targetCard.id, { swapped: true });

    this.showFeedback(this.localize(this.currentWorld.messages.mischiefSwapped));
    this.cdr.detectChanges();

    await this.sleep(1200);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    this.setCardState(cardId, { swapped: false });
    this.setCardState(targetCard.id, { swapped: false });

    this.boardLocked = false;
    this.checkWin();
    this.cdr.detectChanges();
  }

  private async handleMischiefAsSecond(
    mischiefCardId: string,
    firstAnimalCardId: string,
    sessionId: number
  ): Promise<void> {
    this.boardLocked = true;
    this.setCardState(mischiefCardId, { matched: true });
    this.cdr.detectChanges();

    await this.sleep(700);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    this.swapCards(mischiefCardId, firstAnimalCardId);
    this.setCardState(mischiefCardId, { swapped: true });
    this.setCardState(firstAnimalCardId, { swapped: true });

    this.showFeedback(this.localize(this.currentWorld.messages.mischiefMovedCard));
    this.cdr.detectChanges();

    await this.sleep(1200);

    if (this.isOldBoard(sessionId)) {
      return;
    }

    this.setCardState(mischiefCardId, { swapped: false });
    this.setCardState(firstAnimalCardId, {
      swapped: false,
      flipped: false,
    });

    this.resetTurn();
    this.cdr.detectChanges();
  }

  onHintClicked(): void {
    if (this.hintInProgress) {
      return;
    }

    if (!this.canUseHint()) {
      return;
    }

    this.hintInProgress = true;

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
      this.hintInProgress = false;
      return;
    }

    const hintedAnimalId = matchingPair[0].animalId ?? null;

    const isSameHintAsBefore =
      hintedAnimalId !== null &&
      hintedAnimalId === this.lastHintedAnimalId;

    if (!isSameHintAsBefore) {
      this.coins -= this.hintCost;
      this.lastHintedAnimalId = hintedAnimalId;
    }

    this.boardLocked = true;

    const [firstHintCard, secondHintCard] = matchingPair;

    this.setCardState(firstHintCard.id, { flipped: true, hinted: true });
    this.setCardState(secondHintCard.id, { flipped: true, hinted: true });

    this.showFeedback(
      isSameHintAsBefore
        ? this.currentLanguage === 'bg'
          ? '💡 Същата помощ е показана отново'
          : '💡 Same hint shown again'
        : this.currentLanguage === 'bg'
          ? `💡 Използвана помощ (-${this.hintCost} монети)`
          : `💡 Hint used (-${this.hintCost} coins)`
    );

    this.cdr.detectChanges();

    setTimeout(() => {
      this.setCardState(firstHintCard.id, { flipped: false, hinted: false });
      this.setCardState(secondHintCard.id, { flipped: false, hinted: false });
      this.boardLocked = false;
      this.hintInProgress = false;
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
    return `${this.boardSessionId}-${card.id}`;
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
      this.showFeedback(this.localize(this.currentWorld.messages.welcome));
    } else {
      this.showFeedback('🏆 You finished all available worlds!');
    }

    this.cdr.detectChanges();
  }

  private updateViewportMode(): void {
    this.isPhoneView = window.innerWidth <= this.PHONE_MAX_WIDTH;
  }


  private clearMascotBubbles(): void {
    this.showPengBubble = false;
    this.showPhinBubble = false;
    this.currentPengSpeech = '';
    this.currentPhinSpeech = '';
    this.activeMobileSpeaker = null;
  }

  onMascotClick(mascot: 'peng' | 'phin'): void {
    const text =
      mascot === 'peng'
        ? this.localize(this.currentWorld.mascotMessages.peng)
        : this.localize(this.currentWorld.mascotMessages.phin);
    const audioPath =
      mascot === 'peng'
        ? this.currentWorld.mascotAudio?.peng?.[this.currentLanguage]
        : this.currentWorld.mascotAudio?.phin?.[this.currentLanguage];
    this.clearMascotBubbles();
    this.clearFeedbackMessage();

    if (this.isPhoneView) {
      this.activeMobileSpeaker = mascot;

      this.showFeedback(
        `${mascot === 'peng' ? '🐧 Peng' : '🐬 Phin'}: ${text}`,
        2200
      );

      if (audioPath) {
        this.audioService.play(audioPath);
      }

      window.setTimeout(() => {
        if (this.activeMobileSpeaker === mascot) {
          this.activeMobileSpeaker = null;
          this.cdr.detectChanges();
        }
      }, 2200);

      return;
    }

    if (mascot === 'peng') {
      this.currentPengSpeech = text;
      this.showPengBubble = true;
    } else {
      this.currentPhinSpeech = text;
      this.showPhinBubble = true;
    }

    this.cdr.detectChanges();

    if (audioPath) {
      this.audioService.play(audioPath);
    }

    window.setTimeout(() => {
      if (mascot === 'peng') {
        this.showPengBubble = false;
        this.currentPengSpeech = '';
      } else {
        this.showPhinBubble = false;
        this.currentPhinSpeech = '';
      }

      this.cdr.detectChanges();
    }, 2600);
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
    const allCardsResolved = this.cards.every((card) => card.matched);

    if (!allCardsResolved) {
      return;
    }

    setTimeout(() => {
      if (this.currentWorldIndex === 0 && this.currentLevel === 1) {
        this.showSpecialCardsIntroModal = true;
      } else if (this.currentLevel === this.currentWorld.levels.length) {
        this.showWorldCompleteModal = true;
      } else {
        this.showLevelCompleteModal = true;
      }

      this.cdr.detectChanges();
    }, 1000);
  }

  private showFeedback(message: string, duration = 1800): void {
    if (this.feedbackTimeoutId !== null) {
      window.clearTimeout(this.feedbackTimeoutId);
      this.feedbackTimeoutId = null;
    }

    this.feedbackMessage = message;
    this.cdr.detectChanges();

    this.feedbackTimeoutId = window.setTimeout(() => {
      this.feedbackMessage = '';
      this.feedbackTimeoutId = null;
      this.cdr.detectChanges();
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

  get soundEnabled(): boolean {
    return this.audioService.getSoundEnabled();
  }

  get soundIcon(): string {
    return this.soundEnabled ? '🔊' : '🔇';
  }

  toggleSound(): void {
    this.audioService.toggleSound();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  onPreviousLevelClicked(): void {
    if (this.currentLevel > 1) {
      this.currentLevel--;
      this.setupBoard();
      return;
    }

    if (this.currentWorldIndex > 0) {
      this.currentWorldIndex--;

      this.currentLevel =
        this.currentWorld.levels.length;

      this.setupBoard();
    }
  }

  onNextLevelClicked(): void {
    if (
      this.currentLevel <
      this.currentWorld.levels.length
    ) {
      this.currentLevel++;
      this.setupBoard();
      return;
    }

    if (
      this.currentWorldIndex <
      WORLDS.length - 1
    ) {
      this.currentWorldIndex++;
      this.currentLevel = 1;

      this.setupBoard();
    }
  }

  stayAndExplore(): void {
    this.showLevelCompleteModal = false;
    this.cdr.detectChanges();
  }

  stayAndExploreSpecialIntro(): void {
    this.showSpecialCardsIntroModal = false;
    this.cdr.detectChanges();
  }

  stayAndExploreWorldComplete(): void {
    this.showWorldCompleteModal = false;
    this.cdr.detectChanges();
  }

  private isOldBoard(sessionId: number): boolean {
    return sessionId !== this.boardSessionId;
  }

  get isFinalLevel(): boolean {
    return (
      this.currentWorldIndex === WORLDS.length - 1 &&
      this.currentLevel === this.currentWorld.levels.length
    );
  }

  private listenForAppUpdates(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.showUpdateSnackbar = true;
        this.cdr.detectChanges();
      }
    });
  }

  refreshApp(): void {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

}