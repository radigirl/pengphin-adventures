import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { en } from '../i18n/en';
import { bg } from '../i18n/bg';

export type AppLanguage = 'en' | 'bg';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject =
    new BehaviorSubject<AppLanguage>(
      this.getSavedLanguage()
    );

  currentLanguage$ =
    this.currentLanguageSubject.asObservable();

  private translationsMap = {
    en,
    bg,
  };

  private currentTranslations =
    this.translationsMap[this.getSavedLanguage()];

  setLanguage(lang: AppLanguage): void {
    this.currentLanguageSubject.next(lang);

    this.currentTranslations =
      this.translationsMap[lang];

    localStorage.setItem(
      'pengphin-language',
      lang
    );
  }

  toggleLanguage(): void {
    const next =
      this.getLanguage() === 'en'
        ? 'bg'
        : 'en';

    this.setLanguage(next);
  }

  getLanguage(): AppLanguage {
    return this.currentLanguageSubject.value;
  }

  t(path: string): string {
    return (
      path
        .split('.')
        .reduce(
          (obj: any, key) => obj?.[key],
          this.currentTranslations
        ) || path
    );
  }

  private getSavedLanguage(): AppLanguage {
    const saved = localStorage.getItem(
      'pengphin-language'
    );

    return saved === 'bg'
      ? 'bg'
      : 'en';
  }
}