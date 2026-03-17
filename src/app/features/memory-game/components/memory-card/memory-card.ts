import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoryCard as MemoryCardModel } from '../../../../core/models/memory-card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [],
  templateUrl: './memory-card.html',
  styleUrl: './memory-card.scss',
})
export class MemoryCard {
  @Input() card!: MemoryCardModel;

  @Output() cardClicked = new EventEmitter<void>();

  onCardClick(): void {
    this.cardClicked.emit();
  }

  isImageIcon(icon: string): boolean {
    return !!icon && (
      icon.startsWith('assets/') ||
      icon.startsWith('./assets/') ||
      icon.includes('.png') ||
      icon.includes('.jpg') ||
      icon.includes('.jpeg') ||
      icon.includes('.webp') ||
      icon.includes('.svg')
    );
  }

}