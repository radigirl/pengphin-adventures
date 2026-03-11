import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OCEAN_ANIMALS } from '../../../../core/data/ocean.animals';
import { OCEAN_LEVELS } from '../../../../core/data/ocean.levels';
import { MemoryCard as MemoryCardModel } from '../../../../core/models/memory-card.model';
import { MemoryGameService } from '../../../../core/services/memory-game.service';
import { MemoryCard } from '../../components/memory-card/memory-card';
import { ScoreBar } from '../../components/score-bar/score-bar';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, MemoryCard, ScoreBar],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage implements OnInit {
  cards: MemoryCardModel[] = [];
  currentLevel = 1;

  constructor(private memoryGameService: MemoryGameService) {}

  ngOnInit(): void {
    const levelConfig = OCEAN_LEVELS[this.currentLevel - 1];
    this.cards = this.memoryGameService.createBoard(OCEAN_ANIMALS, levelConfig);
  }
}