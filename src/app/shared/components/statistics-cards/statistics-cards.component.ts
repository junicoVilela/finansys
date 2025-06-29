import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsCardComponent, StatisticsCardConfig } from '../statistics-card/statistics-card.component';

@Component({
  selector: 'app-statistics-cards',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent],
  templateUrl: './statistics-cards.component.html',
  styleUrls: ['./statistics-cards.component.scss']
})
export class StatisticsCardsComponent {
  @Input() cards: StatisticsCardConfig[] = [];

  get columnClass(): string {
    const count = this.cards.length;
    
    if (count === 1) return 'col-md-12';
    if (count === 2) return 'col-md-6';
    if (count === 3) return 'col-md-4';
    if (count === 4) return 'col-md-3';
    
    // Para mais de 4 cards, usar col-md-3
    return 'col-md-3';
  }
} 