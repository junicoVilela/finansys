import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

import { switchMap } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: UntypedFormGroup;
    pageTitle: string;
    serverErrorMessages: any = null;
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

    get f(){
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

    submitForm() {
        this.submittingForm = true;

        if(this.currentAction == "new") {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'new') {
            this.currentAction = "new";
        } else {
            this.currentAction = "edit";
        }
    }

    protected loadResource() {
        if (this.currentAction == 'edit') {

            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")!))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource)
                },
                (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
            )
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

        this.resourceService.create(resource)
            .subscribe(
                category => this.actionsForSuccess(category),
                error => this.actionsForError(error)
            )
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe(
            category => this.actionsForSuccess(category),
            error => this.actionsForError(error)
        )
    }

    protected actionsForSuccess(resource: T) {
        this.toastrService.success("Solicitação processada com sucesso!");

        const baseComponentPath: any = this.route.snapshot.parent?.url[0].path;

        this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
            () => this.router.navigate([baseComponentPath, resource.id, "edit"])
        )
    }

    protected actionsForError(error: any) {
        this.toastrService.error("Ocorreu um erro ao processar a sua solicitação!");

        this.submittingForm = false;

        if(error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente novamente mais tarde"];
        }
    }

    protected abstract buildResourceForm(): void;

}
