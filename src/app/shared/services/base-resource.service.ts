import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { BaseResourceModel } from "../models/base-resource.model";


export abstract  class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    protected constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient)
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map((x: any) => this.jsonDataToResources(x)),
            catchError(this.handleError))
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(x => this.jsonDataToResource(x)),
            catchError(this.handleError)

        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(x => this.jsonDataToResource(x)),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        console.log(this);
        const resources:  T[] = [];
        jsonData.forEach(element =>
            resources.push(this.jsonDataToResourceFn(element))
        );
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO ==> ", error);

        return throwError(error);
    }

}