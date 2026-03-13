import { WorldConfig } from '../models/world-config.model';

import { OCEAN_ANIMALS } from './ocean.animals';
import { OCEAN_LEVELS } from './ocean.levels';

import { FARM_ANIMALS } from './farm.animals';
import { FARM_LEVELS } from './farm.levels';

import { JUNGLE_ANIMALS } from './jungle.animals';
import { JUNGLE_LEVELS } from './jungle.levels';

export const WORLDS: WorldConfig[] = [
  {
    id: 'ocean',
    title: 'Ocean',
    icon: '🌊',
    backgroundImage: 'assets/backgrounds/ocean-bg.png',
    animals: OCEAN_ANIMALS,
    levels: OCEAN_LEVELS,

    bonusIcon: '🧰',
    bonusName: 'Treasure Chest',

    mischiefIcon: '🐙',
    mischiefName: 'Octopus',

    theme: {
      titleColor: '#e6f7ff',
      subtitleColor: '#c7f1ff',
      boardWrapBg: '#3a8f9f',
      mascotBg: '#78c6d0',
      mascotTextColor: '#ffffff',
      scoreBarBg: '#2b6f7a',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#f4a261',
      hintButtonTextColor: '#1f2937',
    },

    messages: {
      welcome: '🌊 Welcome to the Ocean!',
      subtitleMessage: 'Dive into the Ocean!',
      bonusFound: '🎉 Treasure found! +25 coins',
      mischiefSwapped: '🐙 Octopus mischief! Cards swapped!',
      mischiefFailed: '🐙 Octopus looked around… but nothing could be swapped!',
      mischiefMovedCard: '🐙 Octopus moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Ocean World Complete!',
      worldCompleteText: 'You finished all 5 Ocean levels.',
    },
    mascots: {
      peng: 'assets/mascots/peng-ocean.png',
      phin: 'assets/mascots/phin-ocean.png',
    },
    mascotMessages: {
      peng: "Let's explore the ocean!",
      phin: "Find the matching sea animals!"
    }
  },

  {
    id: 'farm',
    title: 'Farm',
    icon: '🚜',
    backgroundImage: 'assets/backgrounds/farm-bg.png',
    animals: FARM_ANIMALS,
    levels: FARM_LEVELS,

    bonusIcon: '🧺',
    bonusName: 'Egg Basket',

    mischiefIcon: '🐔',
    mischiefName: 'Mad Chicken',

    theme: {
      titleColor: '#fffaf0',
      subtitleColor: '#fef3c7',
      boardWrapBg: 'rgba(74, 124, 59, 0.78)',
      mascotBg: 'rgba(255, 248, 220, 0.20)',
      mascotTextColor: '#ffffff',
      scoreBarBg: 'rgba(245, 158, 11, 0.22)',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#ffe08a',
      hintButtonTextColor: '#3b2f1b',
    },

    messages: {
      welcome: '🚜 Welcome to the Farm!',
      subtitleMessage: 'Explore the Farm!',
      bonusFound: '🥚 Egg basket found! +25 coins',
      mischiefSwapped: '🐔 Mad Chicken mischief! Cards swapped!',
      mischiefFailed: '🐔 Mad Chicken looked around… but nothing could be swapped!',
      mischiefMovedCard: '🐔 Mad Chicken moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Farm World Complete!',
      worldCompleteText: 'You finished all 5 Farm levels.',
    },
    mascots: {
      peng: 'assets/mascots/peng-farm.png',
      phin: 'assets/mascots/phin-farm.png',
    },
    mascotMessages: {
      peng: "Let's explore the farm!",
      phin: "Find the matching farm animals!"
    }
  },

  {
    id: 'jungle',
    title: 'Jungle',
    icon: '🌴',
    backgroundImage: 'assets/backgrounds/ocean-bg.png',
    animals: JUNGLE_ANIMALS,
    levels: JUNGLE_LEVELS,

    bonusIcon: '🍌',
    bonusName: 'Banana Bunch',

    mischiefIcon: '🐒',
    mischiefName: 'Sneaky Monkey',

    theme: {
      titleColor: '#f0fdf4',
      subtitleColor: '#dcfce7',
      boardWrapBg: 'rgba(21, 128, 61, 0.78)',
      mascotBg: 'rgba(187, 247, 208, 0.18)',
      mascotTextColor: '#ffffff',
      scoreBarBg: 'rgba(34, 197, 94, 0.22)',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#fde68a',
      hintButtonTextColor: '#3f3a1f',
    },

    messages: {
      welcome: '🌴 Welcome to the Jungle!',
      subtitleMessage: 'Explore the Jungle!',
      bonusFound: '🍌 Banana bunch found! +25 coins',
      mischiefSwapped: '🐒 Sneaky Monkey mischief! Cards swapped!',
      mischiefFailed: '🐒 Sneaky Monkey looked around… but nothing could be swapped!',
      mischiefMovedCard: '🐒 Sneaky Monkey moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Jungle World Complete!',
      worldCompleteText: 'You finished all 5 Jungle levels.',
    },
    mascots: {
      peng: '🐧',
      phin: '🐬',
    },

    mascotMessages: {
      peng: "Let's explore the ocean!",
      phin: "Find the matching sea animals!"
    }
  },
];