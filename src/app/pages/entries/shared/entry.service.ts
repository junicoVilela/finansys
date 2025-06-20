import { Injectable, Injector } from '@angular/core';

import {flatMap, Observable} from "rxjs";

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from "./entry.model";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

    constructor(protected override injector: Injector, private categoryService: CategoryService) {
        super("entries", injector, Entry.fromJson);
    }

    override create(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.create.bind(this));
    }

    //fazer dessa forma somente em caso de utilizar angular-in-memory
    override update(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.update.bind(this));
    }

    getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
        return this.getAll().pipe(
            map(entries => this.filterByMonthAndYear(entries, month, year))
        );
    }

    private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<any> {
        return this.categoryService.getById(entry.categoryId!).pipe(
            flatMap(category => {
                entry.category = category;
                return sendFn(entry);
            }),
            catchError(this.handleError)
        );
    }

    private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
        return entries.filter(entry => {
            if (!entry.date) return false;
            
            const entryDate = this.parseDate(entry.date);

            const monthMatches = entryDate.getMonth() + 1 === month;
            const yearMatches = entryDate.getFullYear() === year;

            return monthMatches && yearMatches;
        });
    }

    private parseDate(dateString: string): Date {
        // Assume formato DD/MM/YYYY
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Mês em JavaScript é 0-indexed
        const year = parseInt(parts[2], 10);
        
        return new Date(year, month, day);
    }
}
