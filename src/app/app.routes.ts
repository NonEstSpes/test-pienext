import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./book-list/book-list').then(m => m.BookList),
    title: 'Список всех книг',
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./book-list/book-item/book-item').then(m => m.BookItem),
    title: 'Выбранная книга',
  },
  {
    path: 'add-book',
    loadComponent: () => import('./book-list/add-book/add-book').then(m => m.AddBook),
    title: 'Добавление новой книги',
  },
];
