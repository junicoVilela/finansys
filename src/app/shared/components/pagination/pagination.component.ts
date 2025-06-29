import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}

export interface PaginationOptions {
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  showInfo?: boolean;
  iconClass?: string;
  iconColor?: string;
  itemType?: string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PaginationComponent {
  @Input() data!: PaginationData;
  @Input() options: PaginationOptions = {
    itemsPerPageOptions: [5, 10, 20, 50],
    showItemsPerPage: true,
    showInfo: true,
    iconClass: 'bi-collection',
    iconColor: 'primary',
    itemType: 'itens'
  };

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  // Propriedade para usar Math no template
  Math = Math;

  // Método para ir para uma página específica
  goToPage(page: number): void {
    if (page >= 1 && page <= this.data.totalPages && page !== this.data.currentPage) {
      this.pageChange.emit(page);
    }
  }

  // Método para ir para a próxima página
  nextPage(): void {
    if (this.data.currentPage < this.data.totalPages) {
      this.goToPage(this.data.currentPage + 1);
    }
  }

  // Método para ir para a página anterior
  previousPage(): void {
    if (this.data.currentPage > 1) {
      this.goToPage(this.data.currentPage - 1);
    }
  }

  // Método para alterar itens por página
  changeItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPageChange.emit(itemsPerPage);
  }

  // Getter para obter array de páginas para exibição
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    console.log('Debug paginação:', {
      currentPage: this.data.currentPage,
      totalPages: this.data.totalPages,
      totalItems: this.data.totalItems
    });
    
    if (this.data.totalPages <= maxVisiblePages) {
      // Mostrar todas as páginas se houver 5 ou menos
      for (let i = 1; i <= this.data.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas ao redor da página atual
      let startPage = Math.max(1, this.data.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(this.data.totalPages, startPage + maxVisiblePages - 1);
      
      // Ajustar se estiver no final
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    console.log('Páginas geradas:', pages);
    return pages;
  }

  // Getter para obter a classe de cor do ícone
  get iconColorClass(): string {
    const colorMap: { [key: string]: string } = {
      'primary': 'bg-primary',
      'success': 'bg-success',
      'danger': 'bg-danger',
      'warning': 'bg-warning',
      'info': 'bg-info',
      'secondary': 'bg-secondary',
      'dark': 'bg-dark'
    };
    
    return colorMap[this.options.iconColor || 'primary'] || 'bg-primary';
  }
} 