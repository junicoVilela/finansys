import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";
import { PaginationService } from "../../../shared/services/pagination.service";
import { SearchService } from "../../../shared/services/search.service";
import { StatisticsService, StatisticsCard } from "../../../shared/services/statistics.service";
import { DeleteModalService } from "../../../shared/services/delete-modal.service";
import { IconService } from "../../../shared/services/icon.service";
import { PaginationOptions } from "../../../shared/components/pagination/pagination.component";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ConfirmDeleteModalComponent } from "../../../shared/components/confirm-delete-modal/confirm-delete-modal.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { StatisticsCardsComponent } from "../../../shared/components/statistics-cards/statistics-cards.component";
import { EmptyStateComponent, EmptyStateConfig } from "../../../shared/components/empty-state/empty-state.component";
import { PageLoadingComponent } from "../../../shared/components/page-loading/page-loading.component";
import { ResourceFiltersComponent } from "../../../shared/components/resource-filters/resource-filters.component";

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
    PaginationComponent,
    StatisticsCardsComponent,
    EmptyStateComponent,
    PageLoadingComponent,
    ResourceFiltersComponent
  ]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector,
    private iconService: IconService,
    protected override toastrService: ToastrService,
    protected override paginationService: PaginationService,
    protected override searchService: SearchService,
    protected override statisticsService: StatisticsService,
    protected override deleteModalService: DeleteModalService
  ) {
    super(
      categoryService, 
      injector, 
      toastrService, 
      paginationService, 
      searchService, 
      statisticsService, 
      deleteModalService
    );
  }

  public getResourceIcon(category: Category): string {
    return this.iconService.getBestIconForCategory(category.name || '');
  }

  public formatResourceDate(date: any): string {
    if (!date) return 'Data não disponível';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'Data inválida';
    
    return dateObj.toLocaleDateString('pt-BR');
  }

  protected getResourceDisplayName(category: Category): string {
    return category.name || 'Categoria sem nome';
  }

  override get emptyStateConfig(): EmptyStateConfig {
    return {
      icon: 'bi-collection',
      title: 'Nenhuma categoria encontrada',
      description: 'Comece criando sua primeira categoria para organizar seus lançamentos',
      buttonText: 'Criar Primeira Categoria',
      buttonLink: 'new'
    };
  }

  override get loadingConfig() {
    return {
      title: 'Carregando categorias...',
      description: 'Aguarde enquanto buscamos suas categorias'
    };
  }

  override get paginationOptions(): PaginationOptions {
    return {
      itemsPerPageOptions: [5, 10, 20, 50],
      showItemsPerPage: true,
      showInfo: true,
      iconClass: 'bi-collection',
      iconColor: 'primary',
      itemType: 'categorias'
    };
  }

  override get searchPlaceholder(): string {
    return 'Buscar categorias...';
  }

  override matchesSearch(category: Category, searchTerm: string): boolean {
    return category.name?.toLowerCase().includes(searchTerm) || 
           category.description?.toLowerCase().includes(searchTerm) || 
           false;
  }

  override get pageSubtitle(): string {
    return 'Gerencie suas categorias de receitas e despesas';
  }

  get totalCategories(): number {
    return this.resources.length;
  }

  get recentCategories(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return this.resources.filter(category => {
      if (!category.createdAt) return false;
      const categoryDate = new Date(category.createdAt);
      return categoryDate.getMonth() === currentMonth && 
             categoryDate.getFullYear() === currentYear;
    }).length;
  }

  override get statisticsCards(): StatisticsCard[] {
    return [
      {
        icon: 'bi-collection',
        iconColor: 'primary',
        value: this.totalCategories,
        label: 'Total de Categorias'
      },
      {
        icon: 'bi-graph-up',
        iconColor: 'success',
        value: this.totalCategories,
        label: 'Categorias Ativas'
      },
      {
        icon: 'bi-calendar-plus',
        iconColor: 'info',
        value: this.recentCategories,
        label: 'Adicionadas este Mês'
      }
    ];
  }
}
