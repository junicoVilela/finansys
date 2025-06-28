import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }
}
