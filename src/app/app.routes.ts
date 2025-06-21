import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./book-list/book-list').then((m) => m.BookList),
  },
];
