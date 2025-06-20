import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";
import { CanComponentDeactivate } from "../../../core/guards/can-deactivate.guard";

import { switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> 
    implements OnInit, AfterContentChecked, CanComponentDeactivate {

    currentAction: string = '';
    resourceForm!: UntypedFormGroup;
    pageTitle: string = '';
    serverErrorMessages: string[] = [];
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: UntypedFormBuilder;
    protected toastrService: ToastrService;

    protected constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(UntypedFormBuilder);
        this.toastrService = this.injector.get(ToastrService);
    }

    get f() {
        return this.resourceForm.controls;
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.resourceForm.dirty && !this.submittingForm) {
            return confirm('Você tem alterações não salvas. Deseja realmente sair?');
        }
        return true;
    }

    submitForm() {
        this.submittingForm = true;
        this.serverErrorMessages = [];

        if (this.resourceForm.invalid) {
            this.markFormGroupTouched();
            this.submittingForm = false;
            this.toastrService.error('Verifique os erros no formulário');
            return;
        }

        if (this.currentAction == "new") {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0]?.path == 'new') {
            this.currentAction = "new";
        } else {
            this.currentAction = "edit";
        }
    }

    protected loadResource() {
        if (this.currentAction == 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => {
                    const id = params.get("id");
                    if (!id) {
                        this.router.navigate(['../'], { relativeTo: this.route });
                        throw new Error('ID não encontrado');
                    }
                    return this.resourceService.getById(+id);
                })
            ).subscribe({
                next: (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource);
                },
                error: (error) => {
                    this.toastrService.error('Erro ao carregar o registro');
                    this.router.navigate(['../'], { relativeTo: this.route });
                }
            });
        }
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return "Novo";
    }

    protected editionPageTitle(): string {
        return "Edição";
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource).subscribe({
            next: (response) => {
                if (environment.enableLogs) {
                    console.log('Create response:', response);
                }
                this.actionsForSuccess(response);
            },
            error: (error) => {
                if (environment.enableLogs) {
                    console.error('Create error:', error);
                }
                this.actionsForError(error);
            }
        });
    }

    protected updateResource() {
        const resource: T = Object.assign(this.resource, this.resourceForm.value);

        this.resourceService.update(resource).subscribe({
            next: (response) => {
                if (environment.enableLogs) {
                    console.log('Update response:', response);
                }
                this.actionsForSuccess(response);
            },
            error: (error) => {
                if (environment.enableLogs) {
                    console.error('Update error:', error);
                }
                this.actionsForError(error);
            }
        });
    }

    protected actionsForSuccess(resource: T) {
        this.toastrService.success("Solicitação processada com sucesso!");
        this.submittingForm = false;
        this.serverErrorMessages = []; // Limpa mensagens de erro

        const baseComponentPath: string = this.route.snapshot.parent?.url[0]?.path || '';

        // Marca o formulário como pristine para evitar o aviso de saída
        this.resourceForm.markAsPristine();

        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, "edit"])
        );
    }

    protected actionsForError(error: any) {
        this.submittingForm = false;

        if (environment.enableLogs) {
            console.error('Form submission error:', error);
        }

        // Só trata como erro se for realmente um erro HTTP
        if (error instanceof HttpErrorResponse && error.status >= 400) {
            if (error.status === 422 && error.error?.errors) {
                this.serverErrorMessages = this.extractErrorMessages(error.error.errors);
            } else {
                this.serverErrorMessages = [];
            }
        } else {
            // Se não for um erro HTTP real, limpa as mensagens de erro
            this.serverErrorMessages = [];
        }
    }

    private extractErrorMessages(errors: any): string[] {
        const messages: string[] = [];
        for (const field in errors) {
            if (errors[field] && Array.isArray(errors[field])) {
                messages.push(...errors[field]);
            }
        }
        return messages;
    }

    private markFormGroupTouched() {
        Object.keys(this.resourceForm.controls).forEach(key => {
            const control = this.resourceForm.get(key);
            control?.markAsTouched();
        });
    }

    protected abstract buildResourceForm(): void;
}
