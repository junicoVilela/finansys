import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateUtils } from '../utils/date.utils';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, formatPattern?: string): string {
    if (!value) return '';
    
    let date: Date;
    
    // Se o valor é uma string, converte para Date
    if (typeof value === 'string') {
      date = DateUtils.stringToDate(value);
    } else if (value instanceof Date) {
      date = value;
    } else {
      return '';
    }
    
    // Se a data não é válida, retorna string vazia
    if (!date || isNaN(date.getTime())) {
      return '';
    }
    
    // Usa o formato fornecido ou o formato padrão
    const pattern = formatPattern || DateUtils.DATE_FORMAT;
    
    try {
      return format(date, pattern, { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  }
} 