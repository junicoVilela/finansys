import {Component, Inject, Injector} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  category: Category = new Category();

  constructor(
      protected categoryService: CategoryService,
      protected override injector: Injector,
      protected categoty: Category
  ) {
    super(injector, categoty, categoryService, Category.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('')
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
