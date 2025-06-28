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
import { PaginationComponent, PaginationData, PaginationOptions } from "../../../shared/components/pagination/pagination.component";

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
    ConfirmDeleteModalComponent,
    PaginationComponent
  ]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredResources: Category[] = [];
  
  // Propriedades para paginação
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedResources: Category[] = [];
  
  categoryToDelete: Category | null = null;
  isDeleting: boolean = false;
  modalData: ConfirmDeleteData | null = null;

  // Propriedade para o subtítulo da página
  pageSubtitle: string = 'Gerencie suas categorias de receitas e despesas';

  // Propriedades para o componente de paginação
  paginationData: PaginationData = {
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10,
    totalItems: 0,
    startItem: 0,
    endItem: 0
  };

  paginationOptions: PaginationOptions = {
    itemsPerPageOptions: [5, 10, 20, 50],
    showItemsPerPage: true,
    showInfo: true,
    iconClass: 'bi-collection',
    iconColor: 'primary',
    itemType: 'categorias'
  };

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
    this.updatePagination();
  }

  // Método para atualizar paginação
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredResources.length / this.itemsPerPage);
    
    // Garantir que a página atual seja válida
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    
    // Calcular índices de início e fim
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    // Obter recursos da página atual
    this.paginatedResources = this.filteredResources.slice(startIndex, endIndex);
    
    // Atualizar dados de paginação para o componente reutilizável
    this.paginationData = {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.filteredResources.length,
      startItem: this.filteredResources.length > 0 ? startIndex + 1 : 0,
      endItem: Math.min(endIndex, this.filteredResources.length)
    };
    
    console.log(`Paginação: Página ${this.currentPage} de ${this.totalPages}, mostrando ${this.paginatedResources.length} de ${this.filteredResources.length} itens`);
  }

  // Método para ir para uma página específica
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Método para ir para a próxima página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  // Método para ir para a página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // Método para alterar itens por página
  changeItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Voltar para a primeira página
    this.updatePagination();
  }

  // Métodos para o componente de paginação reutilizável
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.changeItemsPerPage(itemsPerPage);
  }

  // Método para obter array de páginas para exibição
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Mostrar todas as páginas se houver 5 ou menos
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas ao redor da página atual
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      
      // Ajustar se estiver no final
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
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
    
    // Resetar para a primeira página ao filtrar
    this.currentPage = 1;
    this.updatePagination();
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
        
        // Atualizar lista filtrada e paginação
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
