import { Directive, OnInit, Injector } from '@angular/core';

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";
import { ToastrService } from 'ngx-toastr';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];
    isLoading: boolean = false;

    protected toastrService: ToastrService;

    protected constructor(
        private resourceService: BaseResourceService<T>,
        protected injector: Injector
    ) {
        this.toastrService = this.injector.get(ToastrService);
    }

    ngOnInit(): void {
        this.loadResources();
    }

    loadResources(): void {
        this.isLoading = true;
        this.resourceService.getAll().subscribe({
            next: (resources) => {
                this.resources = resources.sort((a, b) => (b.id! - a.id!));
                this.isLoading = false;
            },
            error: (error) => {
                this.isLoading = false;
                this.toastrService.error('Erro ao carregar a lista');
            }
        });
    }

    deleteResource(resource: T): void {
        const mustDelete = confirm('Deseja realmente excluir este item?');

        if (mustDelete) {
            this.resourceService.delete(resource.id!).subscribe({
                next: () => {
                    this.resources = this.resources.filter(element => element.id !== resource.id);
                    this.toastrService.success('Item excluído com sucesso!');
                },
                error: (error) => {
                    this.toastrService.error('Erro ao excluir o item');
                }
            });
        }
    }
}
