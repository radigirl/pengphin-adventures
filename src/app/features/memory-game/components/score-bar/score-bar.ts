import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-bar.html',
  styleUrl: './score-bar.scss',
})
export class ScoreBar {

  @Input() level = 1;
  @Input() coins = 0;

  @Output() hintClicked = new EventEmitter<void>();

  onHintClick() {
    this.hintClicked.emit();
  }

}