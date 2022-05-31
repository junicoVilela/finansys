import { Injectable, Injector } from '@angular/core';

import {flatMap, Observable, throwError} from "rxjs";

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { Entry } from "./entry.model";
import { CategoryService } from "../../categories/shared/category.service";

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

    constructor(protected override injector: Injector, private categoryService: CategoryService) {
        super("api/entries", injector)
    }

    override create(entry: Entry): Observable<Entry> {
        return this.categoryService.getById(entry.categoryId!).pipe(
            flatMap(category => {
                entry.category = category;
                return super.create(entry);
            })
        );
    }

    //fazer dessa forma somente em caso de utilizar angular-in-memory
    override update(entry: Entry): Observable<Entry> {
        return this.categoryService.getById(entry.categoryId!).pipe(
            flatMap(category => {
                entry.category = category;

                return super.update(entry);
            })
        )
    }

    protected override jsonDataToResources(jsonData: any[]): Entry[] {
        const entries: Entry[] = [];
        jsonData.forEach(element => {
            const entry = Object.assign(new Entry(), element);
            entries.push(entry);
        });
        return entries;
    }

    protected override jsonDataToResource(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }
}
