import { Component, Injector } from '@angular/core';
import { Validators, ReactiveFormsModule } from "@angular/forms";

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "../../../shared/components/server-error-messages/server-error-messages.component";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [BreadCrumbComponent, PageHeaderComponent, ServerErrorMessagesComponent, FormFieldErrorComponent, ReactiveFormsModule, NgClass]
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(
      protected categoryService: CategoryService,
      protected override injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected override updateResource() {
    const categoryName = this.resource.name || "";
    return "Editando Categoria: " + categoryName;
  }

}
