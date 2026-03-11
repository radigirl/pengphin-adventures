export type CardType = 'animal' | 'bonus' | 'mischief';

export interface MemoryCard {
  id: string;
  type: CardType;
  icon: string;
  flipped: boolean;
  matched: boolean;
  animalId?: string;
  hinted?: boolean;
  swapped?: boolean;
  rewardCoins?: number;
}