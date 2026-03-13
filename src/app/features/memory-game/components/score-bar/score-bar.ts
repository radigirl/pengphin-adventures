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
  @Input() hintCost = 20;

  @Input() backgroundColor = 'rgba(255, 255, 255, 0.1)';
  @Input() textColor = '#ffffff';
  @Input() hintButtonBg = '#ffd166';
  @Input() hintButtonTextColor = '#1f2937';

  @Output() hintClicked = new EventEmitter<void>();

  onHintClick(): void {
    if (this.hintDisabled) {
      return;
    }

    this.hintClicked.emit();
  }
}