import { Animal } from './animal.model';
import { LevelConfig } from './level-config.model';

export type AppLanguage = 'en' | 'bg';

export type LocalizedText = {
  en: string;
  bg: string;
};

export interface WorldConfig {
  id: string;
  title: LocalizedText;
  icon: string;
  backgroundImage: string;
  animals: Animal[];
  levels: LevelConfig[];

  bonusIcon: string;
  bonusName: LocalizedText;

  mischiefIcon: string;
  mischiefName: LocalizedText;

  theme: {
    titleColor: string;
    subtitleColor: string;
    boardWrapBg: string;
    mascotBg: string;
    mascotTextColor: string;
    scoreBarBg: string;
    scoreBarTextColor: string;
    hintButtonBg: string;
    hintButtonTextColor: string;
  };

  messages: {
    welcome: LocalizedText;
    subtitleMessage: LocalizedText;
    bonusFound: LocalizedText;
    mischiefSwapped: LocalizedText;
    mischiefFailed: LocalizedText;
    mischiefMovedCard: LocalizedText;
    specialCardsIntroTitle: LocalizedText;
    specialCardsIntroText: LocalizedText;
    worldCompleteTitle: LocalizedText;
    worldCompleteText: LocalizedText;
  };

  mascots: {
    peng: string;
    phin: string;
  };

  mascotMessages: {
    peng: LocalizedText;
    phin: LocalizedText;
  };
}