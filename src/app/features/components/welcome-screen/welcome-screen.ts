import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { LanguageService } from '../../../core/services/language.service';



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

  get soundEnabled(): boolean {
    return this.audioService.getSoundEnabled();
  }


  constructor(
    public languageService: LanguageService,
    private audioService: AudioService
  ) { }

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
    this.audioService.toggleSound();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  onMascotClick(mascot: 'peng' | 'phin'): void {
    const audioPath =
      this.languageService.getWelcomeAudioPath(mascot);

    this.audioService.play(audioPath);
  }

  onStartClick(): void {
    this.startClicked.emit();
  }
}