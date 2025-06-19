import { Component, Injector } from '@angular/core';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [BreadCrumbComponent, PageHeaderComponent, RouterLink, NgFor, NgIf]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(categoryService, injector);
  }
}
