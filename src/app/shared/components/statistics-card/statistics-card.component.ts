import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatisticsCardConfig {
  icon: string;
  iconColor: string;
  value: string | number;
  label: string;
  valueColor?: string;
}

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent {
  @Input() config!: StatisticsCardConfig;

  isMonetaryCard(label: string): boolean {
    return [
      'Total de Receitas',
      'Total de Despesas',
      'Saldo'
    ].includes(label);
  }
} 