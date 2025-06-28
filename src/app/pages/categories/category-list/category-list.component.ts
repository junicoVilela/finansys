import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";
import { IconService } from "../../../shared/services/icon.service";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadCrumbComponent, 
    PageHeaderComponent, 
    RouterLink
  ]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredResources: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector,
    private iconService: IconService
  ) {
    super(categoryService, injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.updateFilteredResources();
  }

  override loadResources(): void {
    this.isLoading = true;
    
    this.categoryService.getAll().subscribe({
      next: (resources) => {
        this.resources = resources.sort((a, b) => (b.id! - a.id!));
        this.isLoading = false;
        this.updateFilteredResources();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastrService.error('Erro ao carregar a lista de categorias');
      }
    });
  }

  private updateFilteredResources(): void {
    console.log('Atualizando filteredResources. Total de recursos:', this.resources.length);
    this.filteredResources = [...this.resources];
    console.log('filteredResources atualizado:', this.filteredResources.length);
  }

  filterCategories(): void {
    if (!this.searchTerm.trim()) {
      this.filteredResources = [...this.resources];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredResources = this.resources.filter(category =>
        category.name?.toLowerCase().includes(term) ||
        category.description?.toLowerCase().includes(term)
      );
    }
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  getCategoryIcon(category: Category): string {
    if (category.icon) {
      return category.icon;
    }
    
    return this.iconService.getBestIconForCategory(category.name || '');
  }

  formatDate(date: any): string {
    if (!date) return 'Data não disponível';
    
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Data inválida';
    }
  }

  getActiveCategories(): number {
    return this.resources.filter(category => category.description && category.description.trim() !== '').length;
  }

  getRecentCategories(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return this.resources.filter(category => {
      if (!category.createdAt) return false;
      const createdDate = new Date(category.createdAt);
      return createdDate >= oneMonthAgo;
    }).length;
  }

  override deleteResource(category: Category): void {
    const message = `Tem certeza que deseja excluir a categoria "${category.name}"?`;
    if (confirm(message)) {
      this.isLoading = true;
      
      this.categoryService.delete(category.id!).subscribe({
        next: () => {
          const initialLength = this.resources.length;
          this.resources = this.resources.filter(element => element.id !== category.id);

          this.updateFilteredResources();
          this.filterCategories();
          
          this.isLoading = false;
          this.toastrService.success('Categoria excluída com sucesso!');
        },
        error: (error) => {
          this.isLoading = false;
          this.toastrService.error('Erro ao excluir a categoria');
        }
      });
    }
  }
}
