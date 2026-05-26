import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type AppLanguage = 'en' | 'bg';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.scss',
})
export class WelcomeScreen {
  @Input() pengSrc = '';
  @Input() phinSrc = '';

  @Output() startClicked = new EventEmitter<void>();

  soundEnabled = true;
  language: AppLanguage = 'en';

  get title(): string {
    return this.language === 'bg' ? 'Приключенията на PengPhin' : 'PengPhin Adventures';
  }

  get subtitle(): string {
    return this.language === 'bg'
      ? 'Присъедини се към Peng и Phin и открий животинските светове!'
      : 'Join Peng and Phin and explore the animal worlds!';
  }

  get startLabel(): string {
    return this.language === 'bg' ? 'Започни приключението' : 'Start Adventure';
  }

  get pengBubble(): string {
    return this.language === 'bg' ? 'Здравей!' : 'Welcome!';
  }

  get phinBubble(): string {
    return this.language === 'bg' ? 'Да играем!' : 'Let’s play!';
  }

  get soundIcon(): string {
    return this.soundEnabled ? '🔊' : '🔇';
  }

  toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
  }

  toggleLanguage(): void {
    this.language = this.language === 'en' ? 'bg' : 'en';
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

    if (this.language === 'bg' && !hasBulgarianVoice) {
      console.warn('No Bulgarian voice available on this device. Showing text only.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(spokenText);

    utterance.lang =
      this.language === 'bg' && hasBulgarianVoice
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

    utterance.rate = 0.9;
    utterance.pitch = 1.2;

    window.speechSynthesis.speak(utterance);
  }

  onStartClick(): void {
    this.startClicked.emit();
  }
}