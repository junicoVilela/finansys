import { Component, Injector } from '@angular/core';
import { Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { IconService } from "../../../shared/services/icon.service";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "../../../shared/components/server-error-messages/server-error-messages.component";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadCrumbComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent, 
    FormFieldErrorComponent, 
    ReactiveFormsModule
  ]
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  get isEditMode(): boolean {
    return this.resource.id !== null && this.resource.id !== undefined;
  }

  // Propriedade para o subtítulo da página
  get pageSubtitle(): string {
    return this.isEditMode 
      ? 'Edite as informações da categoria' 
      : 'Crie uma nova categoria para organizar suas finanças';
  }

  // Propriedades para seleção de ícones
  selectedIcon: string | null = null;
  showIconSelector: boolean = false;
  availableIcons: string[] = [];
  searchTerm: string = '';
  popularIcons: string[] = [];
  filteredIcons: string[] = [];

  constructor(
      protected categoryService: CategoryService,
      protected override injector: Injector,
      protected iconService: IconService
  ) {
    super(injector, new Category(), categoryService, Category.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [''],
      icon: [null]
    });
  }

  protected override creationPageTitle(): string {
    return "Nova Categoria";
  }

  protected override editionPageTitle(): string {
    const categoryName = this.resource.name || "";
    return "Editar Categoria " + categoryName;
  }

  get categoryIcon(): string {
    if (this.selectedIcon) {
      return this.selectedIcon;
    }
    
    return this.iconService.defaultIcon;
  }

  public override submitForm(): void {
    if (this.resourceForm.valid) {
      this.submittingForm = true;
      
      if (this.selectedIcon) {
        this.resourceForm.patchValue({ icon: this.selectedIcon });
      }
      
      setTimeout(() => {
        super.submitForm();
      }, 500);
    } else {
      Object.keys(this.resourceForm.controls).forEach(key => {
        const control = this.resourceForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.showIconSelector = false;
    this.resourceForm.patchValue({ icon: icon });
  }

  resetIcon(): void {
    this.selectedIcon = null;
    this.resourceForm.patchValue({ icon: null });
  }

  getIconName(icon: string): string {
    return this.iconService.getIconName(icon);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.availableIcons = this.iconService.allIcons;
    this.popularIcons = this.iconService.popularIcons;
    this.filteredIcons = this.availableIcons;
    
    if (this.isEditMode && this.resource) {
      this.selectedIcon = this.resource.icon || null;

      if (this.selectedIcon) {
        this.resourceForm.patchValue({ icon: this.selectedIcon });
      }
    }
  }

  onSearchIcons(term: string) {
    this.searchTerm = term;
    if (!term.trim()) {
      this.filteredIcons = this.availableIcons;
    } else {
      this.filteredIcons = this.iconService.searchIcons(term);
    }
  }
}
