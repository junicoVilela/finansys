import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories-routes')
        .then(m => m.CATEGORIES_ROUTES)
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries-routes')
        .then(m => m.ENTRIES_ROUTES)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports-routes')
        .then(m => m.REPORTS_ROUTES)
  },
  {
    path: '',
    redirectTo: '/reports', pathMatch: 'full'
  }
]; 