import { Injectable } from '@angular/core';

export interface StatisticsCard {
  icon: string;
  iconColor: string;
  value: string | number;
  label: string;
  valueColor?: string;
}

export interface StatisticsConfig {
  cards: StatisticsCard[];
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  
  get config(): StatisticsConfig {
    return {
      cards: [
        {
          icon: 'bi-collection',
          iconColor: 'primary',
          value: 0,
          label: 'Total de Itens'
        }
      ]
    };
  }

  get statisticsCards(): StatisticsCard[] {
    return this.config.cards;
  }

  updateCardValue(cards: StatisticsCard[], label: string, value: number | string): StatisticsCard[] {
    return cards.map(card => 
      card.label === label ? { ...card, value } : card
    );
  }

  addCard(cards: StatisticsCard[], newCard: StatisticsCard): StatisticsCard[] {
    return [...cards, newCard];
  }

  removeCard(cards: StatisticsCard[], label: string): StatisticsCard[] {
    return cards.filter(card => card.label !== label);
  }
} 