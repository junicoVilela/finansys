import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Entry } from './entry.model';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { DateUtils } from '../../../shared/utils/date.utils';

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

    constructor(
        protected override injector: Injector,
        private categoryService: CategoryService
    ) {
        super("entries", injector, Entry.fromJson);
    }

    override create(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.create.bind(this));
    }

    override update(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.update.bind(this));
    }

    // Método para filtrar lançamentos por mês e ano usando date-fns
    filterByMonthAndYear(month: number, year: number): Observable<Entry[]> {
        return this.getAll().pipe(
            map(entries => entries.filter(entry => {
                if (!entry.date) return false;
                
                const entryMonthYear = DateUtils.extractMonthYear(entry.date);
                return entryMonthYear && 
                       entryMonthYear.month === month && 
                       entryMonthYear.year === year;
            })),
            catchError(this.handleError)
        );
    }

    // Método para formatar data para exibição
    formatEntryDate(date: string): string {
        return DateUtils.dateToString(DateUtils.stringToDate(date));
    }

    // Método para validar formato de data
    isValidDate(dateString: string): boolean {
        return DateUtils.isValidDateString(dateString);
    }

    // PRIVATE METHODS

    private setCategoryAndSendToServer(entry: Entry, sendFn: (entry: Entry) => Observable<Entry>): Observable<Entry> {
        return this.categoryService.getById(entry.categoryId!).pipe(
            catchError(this.handleError),
            map(category => {
                entry.category = category;
                return entry;
            }),
            switchMap((entry: Entry) => sendFn(entry)),
            catchError(this.handleError)
        );
    }
}
