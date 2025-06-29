import { Injectable } from '@angular/core';
import { ConfirmDeleteData } from '../components/confirm-delete-modal/confirm-delete-modal.component';

export interface DeleteModalConfig {
  title?: string;
  message?: string;
  itemType?: string;
  deleteButtonText?: string;
  cancelButtonText?: string;
  warningMessage?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService {
  
  private _resourceToDelete: any = null;
  private _isDeleting: boolean = false;

  get config(): DeleteModalConfig {
    return {
      title: 'Excluir Item',
      message: 'Tem certeza que deseja excluir o item "{itemName}"?',
      itemType: 'item',
      deleteButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      warningMessage: 'Esta ação não pode ser desfeita.',
      icon: 'bi-exclamation-triangle'
    };
  }

  get resourceToDelete(): any {
    return this._resourceToDelete;
  }

  get deleting(): boolean {
    return this._isDeleting;
  }

  setDeleting(deleting: boolean): void {
    this._isDeleting = deleting;
  }

  openDeleteModal<T>(resource: T, getDisplayNameFn: (resource: T) => string): ConfirmDeleteData {
    this._resourceToDelete = resource;
    const config = this.config;
    
    const modalData: ConfirmDeleteData = {
      title: config.title || 'Excluir Item',
      message: config.message?.replace('{itemName}', getDisplayNameFn(resource)) || '',
      itemName: getDisplayNameFn(resource),
      warningMessage: config.warningMessage || 'Esta ação não pode ser desfeita.',
      icon: config.icon || 'bi-exclamation-triangle'
    };

    // Abrir modal Bootstrap
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }

    return modalData;
  }

  closeModal(): void {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }

  reset(): void {
    this._resourceToDelete = null;
    this._isDeleting = false;
  }
} 