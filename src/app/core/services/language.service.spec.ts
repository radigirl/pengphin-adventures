import { beforeEach, describe, expect, it } from 'vitest';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should use English by default', () => {
    const service = new LanguageService();

    expect(service.getLanguage()).toBe('en');
  });

  it('should set language to Bulgarian', () => {
    const service = new LanguageService();

    service.setLanguage('bg');

    expect(service.getLanguage()).toBe('bg');
    expect(localStorage.getItem('pengphin-language')).toBe('bg');
  });

  it('should toggle between English and Bulgarian', () => {
    const service = new LanguageService();

    expect(service.getLanguage()).toBe('en');

    service.toggleLanguage();
    expect(service.getLanguage()).toBe('bg');

    service.toggleLanguage();
    expect(service.getLanguage()).toBe('en');
  });

  it('should return translation by key path', () => {
    const service = new LanguageService();

    const translation = service.t<string>('game.level');

    expect(translation).toBeTruthy();
    expect(translation).not.toBe('game.level');
  });
});