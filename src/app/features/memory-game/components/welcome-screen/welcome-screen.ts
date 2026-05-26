import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { Snackbar } from '../../../../shared/snackbar';


@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule, Snackbar],
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.scss',
})
export class WelcomeScreen {
  @Input() pengSrc = '';
  @Input() phinSrc = '';

  @Output() startClicked = new EventEmitter<void>();

  soundEnabled = true;

  isVoiceWarningVisible = false;
  hasShownVoiceWarning = false;
  private voiceWarningTimeout?: number;

  constructor(public languageService: LanguageService) { }

  get language(): string {
    return this.languageService.getLanguage();
  }

  get pengBubble(): string {
    return this.languageService.t('welcome.pengBubble');
  }

  get phinBubble(): string {
    return this.languageService.t('welcome.phinBubble');
  }

  get soundIcon(): string {
    return this.soundEnabled ? '🔊' : '🔇';
  }

  toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  onMascotClick(mascot: 'peng' | 'phin'): void {
    if (!this.soundEnabled) {
      return;
    }

    const visibleText =
      mascot === 'peng'
        ? this.pengBubble
        : this.phinBubble;

    let spokenText = visibleText;

    const availableVoices = window.speechSynthesis.getVoices();

    const hasBulgarianVoice = availableVoices.some((voice) =>
      voice.lang.toLowerCase().startsWith('bg')
    );

    if (this.languageService.getLanguage() === 'bg' && !hasBulgarianVoice) {
      this.showVoiceWarningOnce();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(spokenText);

    utterance.lang =
      this.languageService.getLanguage() === 'bg' && hasBulgarianVoice
        ? 'bg-BG'
        : 'en-US';

    const matchingVoice = availableVoices.find((voice) =>
      utterance.lang.startsWith('bg')
        ? voice.lang.toLowerCase().startsWith('bg')
        : voice.lang.toLowerCase().startsWith('en')
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (mascot === 'peng') {
      utterance.rate = 0.8;
      utterance.pitch = 0.75;
    } else {
      utterance.rate = 1.12;
      utterance.pitch = 1.65;
    }

    window.speechSynthesis.speak(utterance);
  }

  private showVoiceWarningOnce(): void {
    if (this.hasShownVoiceWarning) {
      return;
    }

    this.hasShownVoiceWarning = true;
    this.isVoiceWarningVisible = true;

    window.clearTimeout(this.voiceWarningTimeout);

    this.voiceWarningTimeout = window.setTimeout(() => {
      this.isVoiceWarningVisible = false;
    }, 4200);
  }

  onStartClick(): void {
    this.startClicked.emit();
  }
}