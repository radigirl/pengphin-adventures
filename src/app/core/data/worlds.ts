import { WorldConfig } from '../models/world-config.model';

import { OCEAN_ANIMALS } from './ocean.animals';
import { OCEAN_LEVELS } from './ocean.levels';

import { FARM_ANIMALS } from './farm.animals';
import { FARM_LEVELS } from './farm.levels';

import { JUNGLE_ANIMALS } from './jungle.animals';
import { JUNGLE_LEVELS } from './jungle.levels';

import { ARCTIC_ANIMALS } from './arctic.animals';
import { ARCTIC_LEVELS } from './arctic.levels';

import { DINOSAUR_ANIMALS } from './dinosaur.animals';
import { DINOSAUR_LEVELS } from './dinosaur.levels';

import { SPACE_ANIMALS } from './space.animals';
import { SPACE_LEVELS } from './space.levels';

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
      worldCompleteText: 'You finished all Ocean levels.',
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
      worldCompleteText: 'You finished all Farm levels.',
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
    backgroundImage: 'assets/backgrounds/jungle-bg.png',
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
      worldCompleteText: 'You finished all Jungle levels.',
    },

    mascots: {
      peng: 'assets/mascots/peng-jungle.png',
      phin: 'assets/mascots/phin-jungle.png',
    },

    mascotMessages: {
      peng: "Let's explore the jungle!",
      phin: "Find the matching jungle animals!"
    }
  },

  {
    id: 'arctic',
    title: 'Arctic',
    icon: '❄️',
    backgroundImage: 'assets/backgrounds/arctic-bg.png',
    animals: ARCTIC_ANIMALS,
    levels: ARCTIC_LEVELS,

    bonusIcon: '💎',
    bonusName: 'Ice Crystal',

    mischiefIcon: '🦉',
    mischiefName: 'Snowy Owl',

    theme: {
      titleColor: '#e0f7ff',
      subtitleColor: '#c7f1ff',
      boardWrapBg: 'rgba(59, 130, 246, 0.65)',
      mascotBg: 'rgba(191, 219, 254, 0.18)',
      mascotTextColor: '#ffffff',
      scoreBarBg: 'rgba(37, 99, 235, 0.25)',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#bfdbfe',
      hintButtonTextColor: '#1e3a8a',
    },

    messages: {
      welcome: '❄️ Welcome to the Arctic!',
      subtitleMessage: 'Explore the frozen world!',
      bonusFound: '💎 Ice crystal found! +25 coins',
      mischiefSwapped: '🦉 Snowy Owl mischief! Cards swapped!',
      mischiefFailed: '🦉 Snowy Owl looked around… but nothing could be swapped!',
      mischiefMovedCard: '🦉 Snowy Owl moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Arctic World Complete!',
      worldCompleteText: 'You finished all Arctic levels.',
    },

    mascots: {
      peng: 'assets/mascots/peng-arctic.png',
      phin: 'assets/mascots/phin-arctic.png',
    },

    mascotMessages: {
      peng: "Brrr! Let's explore the Arctic!",
      phin: "Find the matching arctic animals!"
    }
  },

  {
    id: 'dinosaur',
    title: 'Dinosaur',
    icon: '🦖',
    backgroundImage: 'assets/backgrounds/dinosaur-bg.png',
    animals: DINOSAUR_ANIMALS,
    levels: DINOSAUR_LEVELS,

    bonusIcon: '🥚',
    bonusName: 'Dinosaur Egg',

    mischiefIcon: '🦕',
    mischiefName: 'Sneaky Raptor',

    theme: {
      titleColor: '#fef3c7',
      subtitleColor: '#fde68a',
      boardWrapBg: 'rgba(120, 113, 108, 0.70)',
      mascotBg: 'rgba(254, 215, 170, 0.18)',
      mascotTextColor: '#ffffff',
      scoreBarBg: 'rgba(202, 138, 4, 0.28)',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#facc15',
      hintButtonTextColor: '#3f2f05',
    },

    messages: {
      welcome: '🦖 Welcome to the Dinosaur World!',
      subtitleMessage: 'Travel back in time!',
      bonusFound: '🥚 Dinosaur egg found! +25 coins',
      mischiefSwapped: '🦕 Sneaky Raptor mischief! Cards swapped!',
      mischiefFailed: '🦕 Sneaky Raptor looked around… but nothing could be swapped!',
      mischiefMovedCard: '🦕 Sneaky Raptor moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Dinosaur World Complete!',
      worldCompleteText: 'You finished all Dinosaur levels.',
    },

    mascots: {
      peng: 'assets/mascots/peng-dinosaur.png',
      phin: 'assets/mascots/phin-dinosaur.png',
    },

    mascotMessages: {
      peng: "Let's explore the dinosaur world!",
      phin: "Find the matching dinosaurs!"
    }
  },

  {
    id: 'space',
    title: 'Space',
    icon: '🚀',
    backgroundImage: 'assets/backgrounds/space-bg.png',
    animals: SPACE_ANIMALS,
    levels: SPACE_LEVELS,

    bonusIcon: '⭐',
    bonusName: 'Star Crystal',

    mischiefIcon: '👾',
    mischiefName: 'Space Alien',

    theme: {
      titleColor: '#e0f2fe',
      subtitleColor: '#bae6fd',
      boardWrapBg: 'rgba(30, 64, 175, 0.75)',
      mascotBg: 'rgba(96, 165, 250, 0.25)',
      mascotTextColor: '#ffffff',
      scoreBarBg: 'rgba(37, 99, 235, 0.3)',
      scoreBarTextColor: '#ffffff',
      hintButtonBg: '#fcd34d',
      hintButtonTextColor: '#1f2937',
    },

    messages: {
      welcome: '🚀 Welcome to Space!',
      subtitleMessage: 'Explore the Galaxy!',
      bonusFound: '⭐ Star crystal found! +25 coins',
      mischiefSwapped: '👾 Space Alien mischief! Cards swapped!',
      mischiefFailed: '👾 Space Alien looked around… but nothing could be swapped!',
      mischiefMovedCard: '👾 Space Alien moved your card!',
      specialCardsIntroTitle: '✨ New Surprise Cards!',
      specialCardsIntroText: 'Starting in the next level, special cards can appear.',
      worldCompleteTitle: '🌍 Space World Complete!',
      worldCompleteText: 'You finished all Space levels.',
    },

    mascots: {
      peng: 'assets/mascots/peng-space.png',
      phin: 'assets/mascots/phin-space.png',
    },

    mascotMessages: {
      peng: "Let's explore space!",
      phin: "Find the matching space creatures!"
    }
  }
];