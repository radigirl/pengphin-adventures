import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() hintDisabled = false;

  @Output() hintClicked = new EventEmitter<void>();

  onHintClick(): void {
    if (this.hintDisabled) {
      return;
    }

    this.hintClicked.emit();
  }
}