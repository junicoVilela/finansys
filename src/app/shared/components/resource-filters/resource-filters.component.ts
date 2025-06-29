import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ResourceFiltersConfig {
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enableViewModeToggle?: boolean;
  enableItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
}

@Component({
  selector: 'app-resource-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resource-filters.component.html',
  styleUrls: ['./resource-filters.component.scss']
})
export class ResourceFiltersComponent {
  @Input() config: ResourceFiltersConfig = {
    enableSearch: true,
    enableViewModeToggle: true,
    enableItemsPerPage: true,
    searchPlaceholder: 'Buscar...',
    itemsPerPageOptions: [5, 10, 20, 50]
  };

  @Input() searchTerm: string = '';
  @Input() itemsPerPage: number = 10;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  @Output() searchChange = new EventEmitter<string>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
} 