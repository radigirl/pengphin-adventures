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
    title: { en: 'Ocean', bg: 'Океан' },
    icon: '🌊',
    backgroundImage: 'assets/backgrounds/ocean-bg.png',
    animals: OCEAN_ANIMALS,
    levels: OCEAN_LEVELS,

    bonusIcon: 'assets/ocean/treasure.png',
    bonusName: { en: 'Treasure Chest', bg: 'Съкровище' },

    mischiefIcon: 'assets/ocean/octopus.png',
    mischiefName: { en: 'Octopus', bg: 'Октопод' },

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
      welcome: { en: '🌊 Welcome to the Ocean!', bg: '🌊 Добре дошъл в океана!' },
      subtitleMessage: { en: 'Dive into the Ocean!', bg: 'Гмурни се в океана!' },
      bonusFound: { en: '🎉 Treasure found! +25 coins', bg: '🎉 Откри съкровище! +25 монети' },
      mischiefSwapped: { en: '🐙 Octopus mischief! Cards swapped!', bg: '🐙 Октоподът разбърка картите!' },
      mischiefFailed: { en: '🐙 Octopus looked around… but nothing could be swapped!', bg: '🐙 Октоподът се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '🐙 Octopus moved your card!', bg: '🐙 Октоподът премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Ocean World Complete!', bg: '🌍 Океанът е завършен!' },
      worldCompleteText: { en: 'You finished all Ocean levels.', bg: 'Завърши всички нива в океана.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-ocean.png',
      phin: 'assets/mascots/phin-ocean.png',
    },

    mascotMessages: {
      peng: { en: "Let's explore the ocean!", bg: 'Хайде да изследваме океана!' },
      phin: { en: 'Find the matching sea animals!', bg: 'Намери еднаквите морски животни!' },
    },
  },

  {
    id: 'farm',
    title: { en: 'Farm', bg: 'Ферма' },
    icon: '🚜',
    backgroundImage: 'assets/backgrounds/farm-bg.png',
    animals: FARM_ANIMALS,
    levels: FARM_LEVELS,

    bonusIcon: 'assets/farm/treasure.png',
    bonusName: { en: 'Egg Basket', bg: 'Кошничка с яйца' },

    mischiefIcon: 'assets/farm/chicken.png',
    mischiefName: { en: 'Mad Chicken', bg: 'Луда кокошка' },

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
      welcome: { en: '🚜 Welcome to the Farm!', bg: '🚜 Добре дошъл във фермата!' },
      subtitleMessage: { en: 'Explore the Farm!', bg: 'Разгледай фермата!' },
      bonusFound: { en: '🥚 Egg basket found! +25 coins', bg: '🥚 Откри кошничка с яйца! +25 монети' },
      mischiefSwapped: { en: '🐔 Mad Chicken mischief! Cards swapped!', bg: '🐔 Лудата кокошка разбърка картите!' },
      mischiefFailed: { en: '🐔 Mad Chicken looked around… but nothing could be swapped!', bg: '🐔 Лудата кокошка се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '🐔 Mad Chicken moved your card!', bg: '🐔 Лудата кокошка премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Farm World Complete!', bg: '🌍 Фермата е завършена!' },
      worldCompleteText: { en: 'You finished all Farm levels.', bg: 'Завърши всички нива във фермата.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-farm.png',
      phin: 'assets/mascots/phin-farm.png',
    },

    mascotMessages: {
      peng: { en: "Let's explore the farm!", bg: 'Хайде да разгледаме фермата!' },
      phin: { en: 'Find the matching farm animals!', bg: 'Намери еднаквите животни от фермата!' },
    },
  },

  {
    id: 'jungle',
    title: { en: 'Jungle', bg: 'Джунгла' },
    icon: '🌴',
    backgroundImage: 'assets/backgrounds/jungle-bg.png',
    animals: JUNGLE_ANIMALS,
    levels: JUNGLE_LEVELS,

    bonusIcon: 'assets/jungle/treasure.png',
    bonusName: { en: 'Banana Bunch', bg: 'Банани' },

    mischiefIcon: 'assets/jungle/sneaky-monkey.png',
    mischiefName: { en: 'Sneaky Monkey', bg: 'Палавата маймунка' },

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
      welcome: { en: '🌴 Welcome to the Jungle!', bg: '🌴 Добре дошъл в джунглата!' },
      subtitleMessage: { en: 'Explore the Jungle!', bg: 'Разгледай джунглата!' },
      bonusFound: { en: '🍌 Banana bunch found! +25 coins', bg: '🍌 Откри банани! +25 монети' },
      mischiefSwapped: { en: '🐒 Sneaky Monkey mischief! Cards swapped!', bg: '🐒 Палавата маймунка разбърка картите!' },
      mischiefFailed: { en: '🐒 Sneaky Monkey looked around… but nothing could be swapped!', bg: '🐒 Палавата маймунка се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '🐒 Sneaky Monkey moved your card!', bg: '🐒 Палавата маймунка премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Jungle World Complete!', bg: '🌍 Джунглата е завършена!' },
      worldCompleteText: { en: 'You finished all Jungle levels.', bg: 'Завърши всички нива в джунглата.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-jungle.png',
      phin: 'assets/mascots/phin-jungle.png',
    },

    mascotMessages: {
      peng: { en: "Let's explore the jungle!", bg: 'Хайде да разгледаме джунглата!' },
      phin: { en: 'Find the matching jungle animals!', bg: 'Намери еднаквите животни от джунглата!' },
    },
  },

  {
    id: 'arctic',
    title: { en: 'Arctic', bg: 'Арктика' },
    icon: '❄️',
    backgroundImage: 'assets/backgrounds/arctic-bg.png',
    animals: ARCTIC_ANIMALS,
    levels: ARCTIC_LEVELS,

    bonusIcon: 'assets/arctic/treasure.png',
    bonusName: { en: 'Ice Crystal', bg: 'Леден кристал' },

    mischiefIcon: 'assets/arctic/snowy-owl.png',
    mischiefName: { en: 'Snowy Owl', bg: 'Снежна сова' },

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
      welcome: { en: '❄️ Welcome to the Arctic!', bg: '❄️ Добре дошъл в Арктика!' },
      subtitleMessage: { en: 'Explore the frozen world!', bg: 'Разгледай ледения свят!' },
      bonusFound: { en: '💎 Ice crystal found! +25 coins', bg: '💎 Откри леден кристал! +25 монети' },
      mischiefSwapped: { en: '🦉 Snowy Owl mischief! Cards swapped!', bg: '🦉 Снежната сова разбърка картите!' },
      mischiefFailed: { en: '🦉 Snowy Owl looked around… but nothing could be swapped!', bg: '🦉 Снежната сова се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '🦉 Snowy Owl moved your card!', bg: '🦉 Снежната сова премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Arctic World Complete!', bg: '🌍 Арктика е завършена!' },
      worldCompleteText: { en: 'You finished all Arctic levels.', bg: 'Завърши всички нива в Арктика.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-arctic.png',
      phin: 'assets/mascots/phin-arctic.png',
    },

    mascotMessages: {
      peng: { en: "It's cold here! Let's explore the Arctic!", bg: 'Тук е студено! Хайде да разгледаме Арктика!' },
      phin: { en: 'Find the matching arctic animals!', bg: 'Намери еднаквите арктически животни!' },
    },
  },

  {
    id: 'dinosaur',
    title: { en: 'Dinosaur', bg: 'Динозаври' },
    icon: '🦖',
    backgroundImage: 'assets/backgrounds/dinosaur-bg.png',
    animals: DINOSAUR_ANIMALS,
    levels: DINOSAUR_LEVELS,

    bonusIcon: 'assets/dinosaurs/treasure.png',
    bonusName: { en: 'Dinosaur Egg', bg: 'Динозавърско яйце' },

    mischiefIcon: 'assets/dinosaurs/sneaky-raptor.png',
    mischiefName: { en: 'Sneaky Raptor', bg: 'Палав раптор' },

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
      welcome: { en: '🦖 Welcome to the Dinosaur World!', bg: '🦖 Добре дошъл при динозаврите!' },
      subtitleMessage: { en: 'Travel back in time!', bg: 'Върни се назад във времето!' },
      bonusFound: { en: '🥚 Dinosaur egg found! +25 coins', bg: '🥚 Откри динозавърско яйце! +25 монети' },
      mischiefSwapped: { en: '🦕 Sneaky Raptor mischief! Cards swapped!', bg: '🦕 Палавият раптор разбърка картите!' },
      mischiefFailed: { en: '🦕 Sneaky Raptor looked around… but nothing could be swapped!', bg: '🦕 Палавият раптор се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '🦕 Sneaky Raptor moved your card!', bg: '🦕 Палавият раптор премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Dinosaur World Complete!', bg: '🌍 Светът на динозаврите е завършен!' },
      worldCompleteText: { en: 'You finished all Dinosaur levels.', bg: 'Завърши всички нива при динозаврите.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-dinosaur.png',
      phin: 'assets/mascots/phin-dinosaur.png',
    },

    mascotMessages: {
      peng: { en: "Let's explore the dinosaur world!", bg: 'Хайде при динозаврите!' },
      phin: { en: 'Find the matching dinosaurs!', bg: 'Намери еднаквите динозаври!' },
    },
  },

  {
    id: 'space',
    title: { en: 'Space', bg: 'Космос' },
    icon: '🚀',
    backgroundImage: 'assets/backgrounds/space-bg.png',
    animals: SPACE_ANIMALS,
    levels: SPACE_LEVELS,

    bonusIcon: 'assets/space/treasure.png',
    bonusName: { en: 'Star Crystal', bg: 'Звезден кристал' },

    mischiefIcon: 'assets/space/jelly-alien.png',
    mischiefName: { en: 'Jelly Alien', bg: 'Лепкаво извънземно' },

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
      welcome: { en: '🚀 Welcome to Space!', bg: '🚀 Добре дошъл в космоса!' },
      subtitleMessage: { en: 'Explore the Galaxy!', bg: 'Разгледай галактиката!' },
      bonusFound: { en: '⭐ Star crystal found! +25 coins', bg: '⭐ Откри звезден кристал! +25 монети' },
      mischiefSwapped: { en: '👾 Sticky Alien mischief! Cards swapped!', bg: '👾 Лепкавото извънземно разбърка картите!' },
      mischiefFailed: { en: '👾 Sticky Alien looked around… but nothing could be swapped!', bg: '👾 Лепкавото извънземно се огледа… но няма какво да размени!' },
      mischiefMovedCard: { en: '👾 Sticky Alien moved your card!', bg: '👾 Лепкавото извънземно премести картата ти!' },
      specialCardsIntroTitle: { en: '✨ New Surprise Cards!', bg: '✨ Нови изненадващи карти!' },
      specialCardsIntroText: { en: 'Starting in the next level, special cards can appear.', bg: 'От следващото ниво могат да се появят специални карти.' },
      worldCompleteTitle: { en: '🌍 Space World Complete!', bg: '🌍 Космосът е завършен!' },
      worldCompleteText: { en: 'You finished all Space levels.', bg: 'Завърши всички нива в космоса.' },
    },

    mascots: {
      peng: 'assets/mascots/peng-space.png',
      phin: 'assets/mascots/phin-space.png',
    },

    mascotMessages: {
      peng: { en: "Let's explore space!", bg: 'Хайде да изследваме космоса!' },
      phin: { en: 'Find the matching space creatures!', bg: 'Намери еднаквите космически създания!' },
    },
  },
];