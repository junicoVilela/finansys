import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";
import { PaginationService } from "../../../shared/services/pagination.service";
import { SearchService } from "../../../shared/services/search.service";
import { StatisticsService, StatisticsCard } from "../../../shared/services/statistics.service";
import { DeleteModalService } from "../../../shared/services/delete-modal.service";
import { PaginationOptions } from "../../../shared/components/pagination/pagination.component";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ConfirmDeleteModalComponent } from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { StatisticsCardsComponent } from "../../../shared/components/statistics-cards/statistics-cards.component";
import { EmptyStateComponent, EmptyStateConfig } from "../../../shared/components/empty-state/empty-state.component";
import { PageLoadingComponent } from "../../../shared/components/page-loading/page-loading.component";
import { ResourceFiltersComponent } from "../../../shared/components/resource-filters/resource-filters.component";

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
    PaginationComponent,
    StatisticsCardsComponent,
    EmptyStateComponent,
    PageLoadingComponent,
    ResourceFiltersComponent
  ]
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  
  constructor(
    private entryService: EntryService,
    protected override injector: Injector,
    protected override toastrService: ToastrService,
    protected override paginationService: PaginationService,
    protected override searchService: SearchService,
    protected override statisticsService: StatisticsService,
    protected override deleteModalService: DeleteModalService
  ) {
    super(
      entryService, 
      injector, 
      toastrService, 
      paginationService, 
      searchService, 
      statisticsService, 
      deleteModalService
    );
  }

  // ========================================
  // IMPLEMENTAÇÃO DE MÉTODOS ABSTRATOS
  // ========================================

  protected getResourceIcon(entry: Entry): string {
    return entry.type === 'revenue' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  protected formatResourceDate(date: any): string {
    if (!date) return 'Data não disponível';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'Data inválida';
    
    return dateObj.toLocaleDateString('pt-BR');
  }

  protected getResourceDisplayName(entry: Entry): string {
    return entry.name || 'Lançamento sem nome';
  }

  // ========================================
  // CONFIGURAÇÕES ESPECÍFICAS
  // ========================================

  override get emptyStateConfig(): EmptyStateConfig {
    return {
      icon: 'bi-cash-stack',
      title: 'Nenhum lançamento encontrado',
      description: 'Comece criando seu primeiro lançamento para controlar suas finanças',
      buttonText: 'Criar Primeiro Lançamento',
      buttonLink: 'new'
    };
  }

  override get loadingConfig() {
    return {
      title: 'Carregando lançamentos...',
      description: 'Aguarde enquanto buscamos seus lançamentos'
    };
  }

  // ========================================
  // SOBRESCRITA DE CONFIGURAÇÕES
  // ========================================

  // Sobrescrever configuração de paginação
  override get paginationOptions(): PaginationOptions {
    return {
      itemsPerPageOptions: [5, 10, 20, 50],
      showItemsPerPage: true,
      showInfo: true,
      iconClass: 'bi-cash-stack',
      iconColor: 'primary',
      itemType: 'lançamentos'
    };
  }

  // Sobrescrever configuração de busca
  override get searchPlaceholder(): string {
    return 'Buscar lançamentos...';
  }

  // Sobrescrever método de busca
  override matchesSearch(entry: Entry, searchTerm: string): boolean {
    return entry.name?.toLowerCase().includes(searchTerm) || 
           entry.description?.toLowerCase().includes(searchTerm) || 
           entry.amount?.toString().includes(searchTerm) ||
           false;
  }

  // ========================================
  // GETTERS PARA DADOS COMPUTADOS
  // ========================================

  // Getter para compatibilidade com templates
  override get pageSubtitle(): string {
    return 'Gerencie suas receitas e despesas de forma organizada';
  }

  // Getters para estatísticas
  get totalRevenue(): number {
    return this.resources
      .filter(entry => entry.type === 'revenue')
      .reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  get totalExpenses(): number {
    return this.resources
      .filter(entry => entry.type === 'expense')
      .reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  get balance(): number {
    return this.totalRevenue - this.totalExpenses;
  }

  get totalEntries(): number {
    return this.resources.length;
  }

  // Sobrescrever estatísticas
  override get statisticsCards(): StatisticsCard[] {
    return [
      {
        icon: 'bi-graph-up',
        iconColor: 'primary',
        value: this.totalRevenue,
        label: 'Total de Receitas'
      },
      {
        icon: 'bi-graph-down',
        iconColor: 'danger',
        value: this.totalExpenses,
        label: 'Total de Despesas'
      },
      {
        icon: 'bi-calculator',
        iconColor: 'primary',
        value: this.balance,
        label: 'Saldo'
      },
      {
        icon: 'bi-list-check',
        iconColor: 'info',
        value: this.totalEntries,
        label: 'Total de Lançamentos'
      }
    ];
  }
}
