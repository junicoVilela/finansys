import { Component, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';
import { PaginationService, PaginationData } from '../../services/pagination.service';
import { SearchService } from '../../services/search.service';
import { StatisticsService, StatisticsCard } from '../../services/statistics.service';
import { DeleteModalService } from '../../services/delete-modal.service';
import { PaginationOptions } from '../pagination/pagination.component';
import { PageLoadingConfig } from '../page-loading/page-loading.component';
import { EmptyStateConfig } from '../empty-state/empty-state.component';

@Component({
  template: ''
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  
  // Propriedades básicas
  resources: T[] = [];
  isLoading: boolean = false;
  
  // Propriedades para funcionalidades
  viewMode: 'grid' | 'list' = 'grid';
  filteredResources: T[] = [];
  paginatedResources: T[] = [];
  
  // Dados de paginação
  paginationData: PaginationData = {
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10,
    totalItems: 0,
    startItem: 0,
    endItem: 0
  };

  // Dados do modal de exclusão
  modalData: any = null;

  protected constructor(
    protected resourceService: BaseResourceService<T>,
    protected injector: Injector,
    protected toastrService: ToastrService,
    protected paginationService: PaginationService,
    protected searchService: SearchService,
    protected statisticsService: StatisticsService,
    protected deleteModalService: DeleteModalService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
    this.loadResources();
  }

  protected initializeComponent(): void {
    this.paginationService.reset();
    this.viewMode = this.viewModeConfig.defaultMode;
  }

  // Configuração de Paginação
  get paginationConfig() {
    return {
      options: {
        itemsPerPageOptions: [5, 10, 20, 50],
        showItemsPerPage: true,
        showInfo: true,
        iconClass: 'bi-collection',
        iconColor: 'primary',
        itemType: 'itens'
      },
      defaultItemsPerPage: 10,
      enableItemsPerPage: true
    };
  }

  // Configuração de Busca
  get searchConfig() {
    return {
      enabled: true,
      placeholder: 'Buscar...'
    };
  }

  // Configuração de Modo de Visualização
  get viewModeConfig() {
    return {
      defaultMode: 'grid' as const,
      enableToggle: true
    };
  }

  // Configuração de Estado Vazio
  get emptyStateConfig(): EmptyStateConfig | undefined {
    return undefined; // Deve ser sobrescrito pelos componentes filhos
  }

  // Configuração de Carregamento
  get loadingConfig() {
    return {
      title: 'Carregando...',
      description: 'Aguarde enquanto buscamos os dados'
    };
  }

  // Configuração de Estatísticas
  get statisticsConfig() {
    return {
      cards: []
    };
  }

  // Configuração do Modal de Exclusão
  get deleteModalConfig() {
    return this.deleteModalService.config;
  }

  // ========================================
  // MÉTODOS DE FUNCIONALIDADE
  // ========================================

  // Paginação
  onPageChange(page: number): void {
    this.paginationService.onPageChange(page);
    this.updatePagination();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.paginationService.onItemsPerPageChange(itemsPerPage);
    this.updatePagination();
  }

  // Busca
  filterResources(): void {
    this.filteredResources = this.searchService.filterResources(
      this.resources, 
      this.matchesSearch.bind(this)
    );
    this.paginationService.onPageChange(1);
    this.updatePagination();
  }

  matchesSearch(resource: T, searchTerm: string): boolean {
    return this.getResourceDisplayName(resource).toLowerCase().includes(searchTerm.toLowerCase());
  }

  // Modo de Visualização
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  // Estado Vazio
  hasResources(): boolean {
    return this.resources.length > 0;
  }

  // Modal de Exclusão
  openDeleteModal(resource: T): void {
    this.modalData = this.deleteModalService.openDeleteModal(
      resource, 
      this.getResourceDisplayName.bind(this)
    );
  }

  confirmDelete(): void {
    if (this.modalData) {
      this.deleteModalService.setDeleting(true);
      const resourceToDelete = this.deleteModalService.resourceToDelete;
      
      if (resourceToDelete) {
        this.resourceService.delete(resourceToDelete.id).subscribe({
          next: () => {
            this.toastrService.success('Item excluído com sucesso!');
            this.deleteModalService.closeModal();
            this.deleteModalService.reset();
            this.loadResources();
          },
          error: (error) => {
            this.toastrService.error('Erro ao excluir item: ' + error.message);
            this.deleteModalService.setDeleting(false);
          }
        });
      }
    }
  }

  cancelDelete(): void {
    this.deleteModalService.closeModal();
    this.deleteModalService.reset();
  }

  get pageSubtitle(): string {
    return 'Gerencie seus recursos de forma organizada';
  }

  get paginationOptions(): any {
    return this.paginationService.config.options;
  }

  get itemsPerPage(): number {
    return this.paginationService.itemsPerPage;
  }

  get totalPages(): number {
    return this.paginationService.totalPages;
  }

  get currentPage(): number {
    return this.paginationService.currentPage;
  }

  get enableSearch(): boolean {
    return this.searchService.config.enabled;
  }

  get enableViewModeToggle(): boolean {
    return this.viewModeConfig.enableToggle;
  }

  get enableItemsPerPage(): boolean {
    return this.paginationConfig.enableItemsPerPage || false;
  }

  get searchPlaceholder(): string {
    return this.searchConfig.placeholder;
  }

  get searchTerm(): string {
    return this.searchService.searchTerm;
  }

  set searchTerm(value: string) {
    this.searchService.searchTerm = value;
  }

  get isDeleting(): boolean {
    return this.deleteModalService.deleting;
  }

  get statisticsCards(): StatisticsCard[] {
    return this.statisticsConfig?.cards || [];
  }

  private loadResources(): void {
    this.isLoading = true;
    this.resourceService.getAll().subscribe({
      next: (resources) => {
        this.resources = this.sortResources(resources);
        this.filteredResources = [...this.resources];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        this.handleLoadError(error);
        this.isLoading = false;
      }
    });
  }

  protected sortResources(resources: T[]): T[] {
    return resources.sort((a, b) => {
      const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
      const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  protected handleLoadError(error: any): void {
    this.toastrService.error('Erro ao carregar recursos: ' + error.message);
    console.error('Erro ao carregar recursos:', error);
  }

  private updatePagination(): void {
    this.paginatedResources = this.paginationService.updatePagination(this.filteredResources);
    this.paginationData = this.paginationService.paginationData;
  }

  protected abstract getResourceIcon(resource: T): string;
  protected abstract formatResourceDate(date: any): string;
  protected abstract getResourceDisplayName(resource: T): string;
}
