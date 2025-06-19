import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injector } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { BaseResourceModel } from "../models/base-resource.model";
import { environment } from "../../../environments/environment";


export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    protected constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        const url = `${environment.apiUrl}/${this.apiPath}`;
        return this.http.get<any[]>(url).pipe(
            map((jsonData: any[]) => this.jsonDataToResources(jsonData)),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<T> {
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`;

        return this.http.get<any>(url).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError)
        );
    }

    create(resource: T): Observable<T> {
        const url = `${environment.apiUrl}/${this.apiPath}`;
        return this.http.post<any>(url, resource).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError)
        );
    }

    update(resource: T): Observable<T> {
        const url = `${environment.apiUrl}/${this.apiPath}/${resource.id}`;

        return this.http.put<any>(url, resource).pipe(
            map((jsonData: any) => this.jsonDataToResource(jsonData)),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<void> {
        const url = `${environment.apiUrl}/${this.apiPath}/${id}`;

        return this.http.delete<void>(url).pipe(
            catchError(this.handleError)
        );
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        if (Array.isArray(jsonData)) {
            jsonData.forEach(element =>
                resources.push(this.jsonDataToResourceFn(element))
            );
        }
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError = (error: HttpErrorResponse): Observable<never> => {
        if (environment.enableLogs) {
            console.error("Erro na requisição:", {
                status: error.status,
                message: error.message,
                url: error.url,
                error: error.error
            });
        }

        // Deixa o ErrorInterceptor lidar com a maioria dos erros
        // Mas ainda registra para debugging se necessário
        return throwError(() => error);
    }
}