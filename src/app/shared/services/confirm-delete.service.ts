import { Injectable } from '@angular/core';
import { ConfirmDeleteData } from '../components/confirm-delete-modal/confirm-delete-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {

  constructor() { }

  /**
   * Abre um modal de confirmação de exclusão
   * @param modalId ID único do modal
   * @param data Dados para exibir no modal
   * @returns Promise que resolve quando o modal é confirmado ou rejeitado
   */
  openConfirmDeleteModal(modalId: string, data: ConfirmDeleteData): Promise<boolean> {
    return new Promise((resolve) => {
      // Aguardar um tick para garantir que o DOM foi atualizado
      setTimeout(() => {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          
          // Configurar listeners para os eventos do modal
          const confirmButton = modalElement.querySelector('[data-confirm="true"]');
          const cancelButton = modalElement.querySelector('[data-cancel="true"]');
          
          const handleConfirm = () => {
            modal.hide();
            resolve(true);
            cleanup();
          };
          
          const handleCancel = () => {
            modal.hide();
            resolve(false);
            cleanup();
          };
          
          const handleHidden = () => {
            resolve(false);
            cleanup();
          };
          
          const cleanup = () => {
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
            if (confirmButton) confirmButton.removeEventListener('click', handleConfirm);
            if (cancelButton) cancelButton.removeEventListener('click', handleCancel);
          };
          
          // Adicionar listeners
          modalElement.addEventListener('hidden.bs.modal', handleHidden);
          if (confirmButton) confirmButton.addEventListener('click', handleConfirm);
          if (cancelButton) cancelButton.addEventListener('click', handleCancel);
          
          // Mostrar o modal
          modal.show();
        } else {
          resolve(false);
        }
      }, 0);
    });
  }

  /**
   * Fecha um modal específico
   * @param modalId ID do modal a ser fechado
   */
  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  /**
   * Verifica se um modal está aberto
   * @param modalId ID do modal
   * @returns true se o modal estiver aberto
   */
  isModalOpen(modalId: string): boolean {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      return modalElement.classList.contains('show');
    }
    return false;
  }
} 