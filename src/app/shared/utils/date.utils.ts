import { format, parse, isValid, startOfMonth, endOfMonth, addMonths, subMonths, getMonth, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class DateUtils {
    
    static readonly DATE_FORMAT = 'dd/MM/yyyy';
    static readonly CALENDAR_FORMAT = 'dd/mm/yy'; // Para p-calendar
    static readonly MONTH_YEAR_FORMAT = 'MMMM yyyy';
    static readonly FULL_DATE_FORMAT = "d 'de' MMMM 'de' yyyy";
    static readonly INPUT_DATE_FORMAT = 'yyyy-MM-dd'; // Para input HTML
    
    /**
     * Converte Date para string no formato brasileiro
     */
    static dateToString(date: Date): string {
        if (!date || !isValid(date)) return '';
        return format(date, DateUtils.DATE_FORMAT, { locale: ptBR });
    }
    
    /**
     * Converte string para Date
     */
    static stringToDate(dateString: string): Date {
        if (!dateString) return new Date();
        try {
            const parsedDate = parse(dateString, DateUtils.DATE_FORMAT, new Date());
            return isValid(parsedDate) ? parsedDate : new Date();
        } catch {
            return new Date();
        }
    }
    
    /**
     * Converte Date para formato de input HTML (YYYY-MM-DD)
     */
    static dateToInputString(date: Date | string): string {
        if (!date) return '';
        let dateObj: Date;
        
        if (typeof date === 'string') {
            dateObj = DateUtils.stringToDate(date);
        } else {
            dateObj = date;
        }
        
        if (!isValid(dateObj)) return '';
        return format(dateObj, DateUtils.INPUT_DATE_FORMAT);
    }
    
    /**
     * Converte string de input HTML (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
     */
    static inputStringToDateString(inputDateString: string): string {
        if (!inputDateString) return '';
        try {
            const date = parse(inputDateString, DateUtils.INPUT_DATE_FORMAT, new Date());
            if (!isValid(date)) return '';
            return DateUtils.dateToString(date);
        } catch {
            return '';
        }
    }
    
    /**
     * Valida se uma string é uma data válida
     */
    static isValidDateString(dateString: string): boolean {
        if (!dateString) return false;
        try {
            const parsedDate = DateUtils.stringToDate(dateString);
            return isValid(parsedDate);
        } catch {
            return false;
        }
    }
    
    /**
     * Converte Date para o formato do p-calendar
     */
    static dateToCalendarString(date: Date): string {
        if (!date || !isValid(date)) return '';
        return format(date, DateUtils.CALENDAR_FORMAT, { locale: ptBR });
    }
    
    /**
     * Retorna a data atual formatada
     */
    static get currentDateString(): string {
        return DateUtils.dateToString(new Date());
    }
    
    /**
     * Gera lista de anos para select
     */
    static getYearsRange(startYear?: number, endYear?: number): number[] {
        const currentYear = new Date().getFullYear();
        const start = startYear || currentYear - 5;
        const end = endYear || currentYear + 5;
        
        const years: number[] = [];
        for (let year = start; year <= end; year++) {
            years.push(year);
        }
        return years.sort((a, b) => b - a); // Mais recente primeiro
    }
    
    /**
     * Gera lista de meses para select
     */
    static get monthsOptions(): { value: number, label: string }[] {
        const months: { value: number, label: string }[] = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date(2024, i, 1);
            months.push({
                value: i + 1,
                label: format(date, 'MMMM', { locale: ptBR })
            });
        }
        return months;
    }
    
    /**
     * Formata mês e ano para exibição
     */
    static formatMonthYear(date: Date): string {
        return format(date, DateUtils.MONTH_YEAR_FORMAT, { locale: ptBR });
    }
    
    /**
     * Configuração de localização para PrimeNG Calendar
     */
    static get primeNGLocale() {
        return {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        };
    }
    
    /**
     * Extrai mês e ano de uma string de data
     */
    static extractMonthYear(dateString: string): { month: number, year: number } | null {
        try {
            const date = DateUtils.stringToDate(dateString);
            if (!isValid(date)) return null;
            
            return {
                month: getMonth(date) + 1, // getMonth retorna 0-11
                year: getYear(date)
            };
        } catch {
            return null;
        }
    }
} 