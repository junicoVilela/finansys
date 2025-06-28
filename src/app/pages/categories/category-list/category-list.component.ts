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
import { ConfirmDeleteModalComponent, ConfirmDeleteData } from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import { ConfirmDeleteService } from "../../../shared/services/confirm-delete.service";

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
    RouterLink,
    ConfirmDeleteModalComponent
  ]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredResources: Category[] = [];
  
  categoryToDelete: Category | null = null;
  isDeleting: boolean = false;
  modalData: ConfirmDeleteData | null = null;

  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector,
    private iconService: IconService,
    private confirmDeleteService: ConfirmDeleteService
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
      console.log('Iniciando exclusão da categoria:', category.id, category.name);
      this.isLoading = true;
      
      this.categoryService.delete(category.id!).subscribe({
        next: () => {
          console.log('Categoria excluída com sucesso no servidor');
          
          // Remover da lista principal
          const initialLength = this.resources.length;
          this.resources = this.resources.filter(element => element.id !== category.id);
          console.log(`Removido da lista principal: ${initialLength} -> ${this.resources.length}`);
          
          // Atualizar lista filtrada imediatamente
          this.updateFilteredResources();
          this.filterCategories();
          
          this.isLoading = false;
          this.toastrService.success('Categoria excluída com sucesso!');
          
          console.log('Estado final - resources:', this.resources.length, 'filteredResources:', this.filteredResources.length);
        },
        error: (error) => {
          console.error('Erro ao excluir categoria:', error);
          this.isLoading = false;
          this.toastrService.error('Erro ao excluir a categoria');
        }
      });
    }
  }

  // Método para abrir o modal de exclusão
  openDeleteModal(category: Category): void {
    this.categoryToDelete = category;
    this.modalData = {
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir a categoria',
      itemName: category.name || '',
      warningMessage: 'Todos os lançamentos associados a esta categoria também serão afetados.',
      icon: 'bi-exclamation-triangle'
    };
    
    // Usar Bootstrap Modal API
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  // Método para confirmar a exclusão via modal
  confirmDelete(): void {
    if (!this.categoryToDelete) return;
    
    this.isDeleting = true;
    console.log('Iniciando exclusão da categoria:', this.categoryToDelete.id, this.categoryToDelete.name);
    
    this.categoryService.delete(this.categoryToDelete.id!).subscribe({
      next: () => {
        console.log('Categoria excluída com sucesso no servidor');
        
        // Remover da lista principal
        const initialLength = this.resources.length;
        this.resources = this.resources.filter(element => element.id !== this.categoryToDelete!.id);
        console.log(`Removido da lista principal: ${initialLength} -> ${this.resources.length}`);
        
        // Atualizar lista filtrada imediatamente
        this.updateFilteredResources();
        this.filterCategories();
        
        this.isDeleting = false;
        this.categoryToDelete = null;
        this.modalData = null;
        
        // Fechar o modal
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();
        
        this.toastrService.success('Categoria excluída com sucesso!');
        
        console.log('Estado final - resources:', this.resources.length, 'filteredResources:', this.filteredResources.length);
      },
      error: (error) => {
        console.error('Erro ao excluir categoria:', error);
        this.isDeleting = false;
        this.toastrService.error('Erro ao excluir a categoria');
      }
    });
  }

  // Método para cancelar a exclusão
  cancelDelete(): void {
    this.categoryToDelete = null;
    this.modalData = null;
    this.isDeleting = false;
  }
}
