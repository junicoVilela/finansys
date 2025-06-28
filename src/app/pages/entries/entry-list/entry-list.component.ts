import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ConfirmDeleteModalComponent, ConfirmDeleteData } from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import { ConfirmDeleteService } from "../../../shared/services/confirm-delete.service";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { PaginationComponent, PaginationData, PaginationOptions } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadCrumbComponent, 
    PageHeaderComponent, 
    RouterLink,
    ConfirmDeleteModalComponent,
    DateFormatPipe,
    PaginationComponent
  ]
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  
  // Propriedades para funcionalidades da interface
  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredResources: Entry[] = [];
  
  // Propriedades para paginação
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedResources: Entry[] = [];
  
  // Propriedades para o modal de exclusão
  entryToDelete: Entry | null = null;
  isDeleting: boolean = false;
  modalData: ConfirmDeleteData | null = null;

  // Propriedade para o subtítulo da página
  pageSubtitle: string = 'Gerencie suas receitas e despesas de forma organizada';

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
    iconClass: 'bi-cash-stack',
    iconColor: 'primary',
    itemType: 'lançamentos'
  };

  constructor(
    private entryService: EntryService,
    protected override injector: Injector,
    private confirmDeleteService: ConfirmDeleteService
  ) {
    super(entryService, injector);
  }

  // Sobrescrever o método para atualizar recursos filtrados
  override ngOnInit(): void {
    super.ngOnInit();
    // Inicializar filteredResources após o carregamento
    this.updateFilteredResources();
  }

  // Sobrescrever loadResources para atualizar filteredResources
  override loadResources(): void {
    console.log('EntryListComponent: Iniciando carregamento de recursos');
    this.isLoading = true;
    
    this.entryService.getAll().subscribe({
      next: (resources) => {
        console.log('EntryListComponent: Recursos carregados:', resources);
        this.resources = resources.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
        this.isLoading = false;
        this.updateFilteredResources();
      },
      error: (error) => {
        console.error('EntryListComponent: Erro ao carregar recursos:', error);
        this.isLoading = false;
        this.toastrService.error('Erro ao carregar a lista de lançamentos');
      }
    });
  }

  // Método para atualizar recursos filtrados
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

  // Método para filtrar lançamentos baseado no termo de busca
  filterEntries(): void {
    if (!this.searchTerm.trim()) {
      this.filteredResources = [...this.resources];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredResources = this.resources.filter(entry =>
        entry.name?.toLowerCase().includes(term) ||
        entry.description?.toLowerCase().includes(term) ||
        entry.category?.name?.toLowerCase().includes(term)
      );
    }
    
    // Resetar para a primeira página ao filtrar
    this.currentPage = 1;
    this.updatePagination();
  }

  // Método para alternar entre visualizações
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  // Método para calcular total de receitas
  getTotalRevenue(): number {
    return this.resources
      .filter(entry => entry.type === 'revenue')
      .reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  // Método para calcular total de despesas
  getTotalExpenses(): number {
    return this.resources
      .filter(entry => entry.type === 'expense')
      .reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  // Método para calcular saldo
  getBalance(): number {
    return this.getTotalRevenue() - this.getTotalExpenses();
  }

  // Método para contar lançamentos pagos
  getPaidEntries(): number {
    return this.resources.filter(entry => entry.paid).length;
  }

  // Método para contar lançamentos pendentes
  getPendingEntries(): number {
    return this.resources.filter(entry => !entry.paid).length;
  }

  // Método para abrir o modal de exclusão
  openDeleteModal(entry: Entry): void {
    this.entryToDelete = entry;
    this.modalData = {
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir o lançamento',
      itemName: entry.name || '',
      warningMessage: 'Esta ação não pode ser desfeita e o lançamento será removido permanentemente.',
      icon: 'bi-exclamation-triangle'
    };
    
    // Usar Bootstrap Modal API
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  // Método para confirmar a exclusão via modal
  confirmDelete(): void {
    if (!this.entryToDelete) return;
    
    this.isDeleting = true;
    console.log('Iniciando exclusão do lançamento:', this.entryToDelete.id, this.entryToDelete.name);
    
    this.entryService.delete(this.entryToDelete.id!).subscribe({
      next: () => {
        console.log('Lançamento excluído com sucesso no servidor');
        
        // Remover da lista principal
        const initialLength = this.resources.length;
        this.resources = this.resources.filter(element => element.id !== this.entryToDelete!.id);
        console.log(`Removido da lista principal: ${initialLength} -> ${this.resources.length}`);
        
        // Atualizar lista filtrada e paginação
        this.updateFilteredResources();
        this.filterEntries();
        
        this.isDeleting = false;
        this.entryToDelete = null;
        this.modalData = null;
        
        // Fechar o modal
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();
        
        this.toastrService.success('Lançamento excluído com sucesso!');
        
        console.log('Estado final - resources:', this.resources.length, 'filteredResources:', this.filteredResources.length);
      },
      error: (error) => {
        console.error('Erro ao excluir lançamento:', error);
        this.isDeleting = false;
        this.toastrService.error('Erro ao excluir o lançamento');
      }
    });
  }

  // Método para cancelar a exclusão
  cancelDelete(): void {
    this.entryToDelete = null;
    this.modalData = null;
    this.isDeleting = false;
  }
}
