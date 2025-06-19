import { Routes } from "@angular/router";
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from "./entry-form/entry-form.component";

export const ENTRIES_ROUTES: Routes = [
  {
    path: '',
    component: EntryListComponent
  },
  {
    path: 'new',
    component: EntryFormComponent
  },
  {
    path: ':id/edit',
    component: EntryFormComponent
  }
]; 