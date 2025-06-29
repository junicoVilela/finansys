import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  sidebarOpen$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
    this.sidebarOpen$ = this.layoutService.sidebarOpen$;
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
