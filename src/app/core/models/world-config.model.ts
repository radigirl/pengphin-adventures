import { Animal } from './animal.model';
import { LevelConfig } from './level-config.model';

export interface WorldConfig {
  id: string;
  title: string;
  icon: string;
  backgroundImage: string;
  animals: Animal[];
  levels: LevelConfig[];

  bonusIcon: string;
  bonusName: string;

  mischiefIcon: string;
  mischiefName: string;

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
    // cardBackColor: string
    // cardBackPattern?: string
  };

  messages: {
    welcome: string;
    subtitleMessage: string;
    bonusFound: string;
    mischiefSwapped: string;
    mischiefFailed: string;
    mischiefMovedCard: string;
    specialCardsIntroTitle: string;
    specialCardsIntroText: string;
    worldCompleteTitle: string;
    worldCompleteText: string;
  };

  mascots: {
    peng: string;
    phin: string;
  };

  mascotMessages: {
    peng: string;
    phin: string;
  };
}