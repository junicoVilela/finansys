import { Injectable } from '@angular/core';
import { 
  ALL_ICONS, 
  POPULAR_ICONS, 
  DEFAULT_ICON
} from '../constants/icons.constants';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  /**
   * Obtém todos os ícones disponíveis
   */
  get allIcons(): string[] {
    return ALL_ICONS;
  }

  /**
   * Obtém ícones populares
   */
  get popularIcons(): string[] {
    return POPULAR_ICONS;
  }

  /**
   * Obtém o ícone padrão
   */
  get defaultIcon(): string {
    return DEFAULT_ICON;
  }

  /**
   * Obtém o nome amigável de um ícone
   */
  getIconName(icon: string): string {
    if (!icon) return '';
    
    return icon
      .replace('bi-', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Obtém ícones sugeridos baseado em um termo de busca
   */
  searchIcons(searchTerm: string): string[] {
    if (!searchTerm) return POPULAR_ICONS;
    
    const term = searchTerm.toLowerCase();
    return ALL_ICONS.filter(icon => 
      this.getIconName(icon).toLowerCase().includes(term) ||
      icon.toLowerCase().includes(term)
    );
  }

  /**
   * Obtém o ícone mais apropriado baseado no nome da categoria
   */
  getBestIconForCategory(categoryName: string): string {
    if (!categoryName) return this.defaultIcon;
    
    const name = categoryName.toLowerCase();
    
    // Mapeamento direto de palavras-chave para ícones específicos
    const iconMap: { [key: string]: string } = {
      'moradia': 'bi-house',
      'casa': 'bi-house',
      'aluguel': 'bi-house',
      'alimentação': 'bi-cup-hot',
      'comida': 'bi-cup-hot',
      'restaurante': 'bi-cup-hot',
      'transporte': 'bi-car-front',
      'carro': 'bi-car-front',
      'gasolina': 'bi-car-front',
      'saúde': 'bi-heart-pulse',
      'médico': 'bi-heart-pulse',
      'farmacia': 'bi-heart-pulse',
      'educação': 'bi-mortarboard',
      'escola': 'bi-mortarboard',
      'curso': 'bi-mortarboard',
      'lazer': 'bi-film',
      'entretenimento': 'bi-film',
      'cinema': 'bi-film',
      'vestuário': 'bi-bag',
      'roupa': 'bi-bag',
      'shopping': 'bi-bag',
      'salário': 'bi-graph-up',
      'receita': 'bi-graph-up',
      'renda': 'bi-graph-up',
      'investimento': 'bi-bank',
      'poupança': 'bi-bank',
      'ações': 'bi-bank',
      'presente': 'bi-gift',
      'doação': 'bi-gift',
      'caridade': 'bi-gift',
      'tecnologia': 'bi-laptop',
      'software': 'bi-laptop',
      'hardware': 'bi-laptop',
      'trabalho': 'bi-briefcase',
      'emprego': 'bi-briefcase',
      'escritório': 'bi-briefcase'
    };

    // Procurar por correspondência exata
    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (name.includes(keyword)) {
        return icon;
      }
    }

    return this.defaultIcon;
  }
} 