import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.scss',
})
export class WelcomeScreen {
  @Input() pengSrc = '';
  @Input() phinSrc = '';

  @Output() startClicked = new EventEmitter<void>();

  onStartClick(): void {
    this.startClicked.emit();
  }
}