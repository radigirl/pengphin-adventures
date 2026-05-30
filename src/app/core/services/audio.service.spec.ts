import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AudioService } from './audio.service';

describe('AudioService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have sound enabled by default', () => {
    const service = new AudioService();

    expect(service.getSoundEnabled()).toBe(true);
  });

  it('should toggle sound off and save it in localStorage', () => {
    const service = new AudioService();

    const result = service.toggleSound();

    expect(result).toBe(false);
    expect(service.getSoundEnabled()).toBe(false);
    expect(localStorage.getItem('pengphin-sound')).toBe('off');
  });

  it('should toggle sound back on and save it in localStorage', () => {
    const service = new AudioService();

    service.toggleSound();
    const result = service.toggleSound();

    expect(result).toBe(true);
    expect(service.getSoundEnabled()).toBe(true);
    expect(localStorage.getItem('pengphin-sound')).toBe('on');
  });

  it('should not create audio when sound is disabled', () => {
    const audioSpy = vi.spyOn(window, 'Audio');

    const service = new AudioService();

    service.toggleSound();
    service.play('assets/audio/test.mp3');

    expect(audioSpy).not.toHaveBeenCalled();

    audioSpy.mockRestore();
  });
});