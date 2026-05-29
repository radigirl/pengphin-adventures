import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private currentAudio: HTMLAudioElement | null = null;

  soundEnabled =
    localStorage.getItem('pengphin-sound') !== 'off';

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;

    localStorage.setItem(
      'pengphin-sound',
      this.soundEnabled ? 'on' : 'off'
    );

    if (!this.soundEnabled) {
      this.stop();
    }

    return this.soundEnabled;
  }

  play(path: string, playbackRate = 1): void {
    if (!this.soundEnabled || !path) {
      return;
    }

    this.stop();

    console.log('AUDIO PATH:', path);

    const audio = new Audio(path);

    audio.playbackRate = playbackRate;
    this.currentAudio = audio;

    audio.play().catch((error) => {
      console.warn('Audio playback failed:', error);

      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    });

    audio.onended = () => {
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    };
  }

  stop(): void {
    if (!this.currentAudio) {
      return;
    }

    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
    this.currentAudio = null;
  }
}