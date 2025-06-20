import { Routes } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-routes').then(r => r.authRoutes)
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries-routes').then(m => m.ENTRIES_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories-routes').then(m => m.CATEGORIES_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports-routes').then(m => m.REPORTS_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/reports', pathMatch: 'full'
  }
]; 