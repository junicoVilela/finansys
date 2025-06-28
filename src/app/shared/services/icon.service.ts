import { Injectable } from '@angular/core';
import { 
  ICON_CATEGORIES, 
  ALL_ICONS, 
  POPULAR_ICONS, 
  DEFAULT_ICON,
  IconCategory 
} from '../constants/icons.constants';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  /**
   * Obtém todas as categorias de ícones
   */
  getIconCategories(): IconCategory[] {
    return ICON_CATEGORIES;
  }

  /**
   * Obtém todos os ícones disponíveis
   */
  getAllIcons(): string[] {
    return ALL_ICONS;
  }

  /**
   * Obtém ícones populares
   */
  getPopularIcons(): string[] {
    return POPULAR_ICONS;
  }

  /**
   * Obtém ícones de uma categoria específica
   */
  getIconsByCategory(categoryName: string): string[] {
    const category = ICON_CATEGORIES.find(cat => cat.name === categoryName);
    return category ? category.icons : [];
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
   * Obtém o ícone padrão
   */
  getDefaultIcon(): string {
    return DEFAULT_ICON;
  }

  /**
   * Verifica se um ícone existe
   */
  isValidIcon(icon: string): boolean {
    return ALL_ICONS.includes(icon);
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
   * Obtém ícones sugeridos baseado no nome de uma categoria
   */
  getSuggestedIcons(categoryName: string): string[] {
    if (!categoryName) return POPULAR_ICONS;
    
    const name = categoryName.toLowerCase();
    
    // Mapeamento de palavras-chave para categorias
    const keywordMap: { [key: string]: string } = {
      'moradia': 'home',
      'casa': 'home',
      'aluguel': 'home',
      'alimentação': 'food',
      'comida': 'food',
      'restaurante': 'food',
      'transporte': 'transport',
      'carro': 'transport',
      'gasolina': 'transport',
      'saúde': 'health',
      'médico': 'health',
      'farmacia': 'health',
      'educação': 'education',
      'escola': 'education',
      'curso': 'education',
      'lazer': 'entertainment',
      'entretenimento': 'entertainment',
      'cinema': 'entertainment',
      'vestuário': 'clothing',
      'roupa': 'clothing',
      'shopping': 'clothing',
      'salário': 'finance',
      'receita': 'finance',
      'renda': 'finance',
      'investimento': 'finance',
      'poupança': 'finance',
      'ações': 'finance',
      'presente': 'gifts',
      'doação': 'gifts',
      'caridade': 'gifts',
      'tecnologia': 'technology',
      'software': 'technology',
      'hardware': 'technology',
      'trabalho': 'work',
      'emprego': 'work',
      'escritório': 'work'
    };

    // Procurar por palavras-chave
    for (const [keyword, category] of Object.entries(keywordMap)) {
      if (name.includes(keyword)) {
        return this.getIconsByCategory(category);
      }
    }

    // Se não encontrar correspondência, retornar ícones populares
    return POPULAR_ICONS;
  }

  /**
   * Obtém o ícone mais apropriado baseado no nome da categoria
   */
  getBestIconForCategory(categoryName: string): string {
    if (!categoryName) return DEFAULT_ICON;
    
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

    return DEFAULT_ICON;
  }
} 