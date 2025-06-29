import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  public sidebarOpen$: Observable<boolean> = this.sidebarOpenSubject.asObservable();

  constructor() {
    // Verifica se há um estado salvo no localStorage
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      this.sidebarOpenSubject.next(JSON.parse(savedState));
    }
  }

  toggleSidebar(): void {
    const currentState = this.sidebarOpenSubject.value;
    const newState = !currentState;
    this.sidebarOpenSubject.next(newState);
    
    // Salva o estado no localStorage
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    
    // Atualiza a classe no body para compatibilidade com o JavaScript existente
    if (newState) {
      document.body.classList.remove('drawer-toggled');
    } else {
      document.body.classList.add('drawer-toggled');
    }
  }

  openSidebar(): void {
    this.sidebarOpenSubject.next(true);
    localStorage.setItem('sidebarOpen', 'true');
    document.body.classList.remove('drawer-toggled');
  }

  closeSidebar(): void {
    this.sidebarOpenSubject.next(false);
    localStorage.setItem('sidebarOpen', 'false');
    document.body.classList.add('drawer-toggled');
  }

  get isSidebarOpen(): boolean {
    return this.sidebarOpenSubject.value;
  }
} 