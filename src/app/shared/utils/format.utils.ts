import { APP_CONSTANTS } from '../constants/app.constants';

export class FormatUtils {
  
  static formatCurrency(value: number, locale: string = APP_CONSTANTS.CURRENCY.DEFAULT_LOCALE): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: APP_CONSTANTS.CURRENCY.DEFAULT_CURRENCY
    }).format(value);
  }
  
  static formatDate(date: Date | string, format: string = APP_CONSTANTS.DATE_FORMATS.DISPLAY): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    switch (format) {
      case APP_CONSTANTS.DATE_FORMATS.DISPLAY:
        return `${day}/${month}/${year}`;
      case APP_CONSTANTS.DATE_FORMATS.DATETIME:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      case APP_CONSTANTS.DATE_FORMATS.INPUT:
        return `${year}-${month}-${day}`;
      default:
        return dateObj.toLocaleDateString('pt-BR');
    }
  }
  
  static parseStringToNumber(value: string): number {
    if (!value) return 0;
    
    // Remove caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d,.-]/g, '');
    
    // Substitui vírgula por ponto
    const normalizedValue = cleanValue.replace(',', '.');
    
    return parseFloat(normalizedValue) || 0;
  }
  
  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength - 3) + '...';
  }
  
  static capitalizeFirst(text: string): string {
    if (!text) return '';
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
} 