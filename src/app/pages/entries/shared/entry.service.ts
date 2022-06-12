import { Injectable, Injector } from '@angular/core';

import {flatMap, Observable} from "rxjs";

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from "./entry.model";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

    constructor(protected override injector: Injector, private categoryService: CategoryService) {
        super("api/entries", injector, Entry.fromJson);
    }

    override create(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.create.bind(this));
    }

    //fazer dessa forma somente em caso de utilizar angular-in-memory
    override update(entry: Entry): Observable<Entry> {
        return this.setCategoryAndSendToServer(entry, super.update.bind(this));
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

}
