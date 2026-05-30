import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryCard } from './memory-card';
import { MemoryCard as MemoryCardModel } from '../../../core/models/memory-card.model';

describe('MemoryCard', () => {
  let component: MemoryCard;
  let fixture: ComponentFixture<MemoryCard>;

  const mockCard: MemoryCardModel = {
    id: 'fish-1',
    type: 'animal',
    animalId: 'fish',
    icon: 'assets/ocean/fish.png',
    flipped: false,
    matched: false,
    hinted: false,
    swapped: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCard);
    component = fixture.componentInstance;
    component.card = mockCard;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});