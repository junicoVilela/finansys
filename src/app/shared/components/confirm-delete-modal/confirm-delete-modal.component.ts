import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDeleteData {
  title: string;
  message: string;
  itemName: string;
  warningMessage?: string;
  icon?: string;
}

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmDeleteModalComponent {
  @Input() modalId: string = 'confirmDeleteModal';
  @Input() data: ConfirmDeleteData | null = null;
  @Input() isDeleting: boolean = false;
  @Input() deleteButtonText: string = 'Excluir';
  @Input() cancelButtonText: string = 'Cancelar';
  @Input() itemType: string = 'item';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  get modalTitle(): string {
    return this.data?.title || `Confirmar Exclusão`;
  }

  get modalMessage(): string {
    return this.data?.message || `Tem certeza que deseja excluir este ${this.itemType}?`;
  }

  get itemName(): string {
    return this.data?.itemName || '';
  }

  get warningMessage(): string {
    return this.data?.warningMessage || '';
  }

  get icon(): string {
    return this.data?.icon || 'bi-exclamation-triangle';
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 