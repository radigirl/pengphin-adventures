import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
})
export class Snackbar {
  @Input() message = '';
  @Input() isVisible = false;
  @Input() actionLabel = '';

  @Output() actionClicked = new EventEmitter<void>();
}