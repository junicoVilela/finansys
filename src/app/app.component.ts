import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AuthService } from './core/services/auth.service';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet, LoadingComponent]
})
export class AppComponent {
  title = 'finansys';
  isAuthenticated$: Observable<boolean>;
  sidebarOpen$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.sidebarOpen$ = this.layoutService.sidebarOpen$;
  }
}
