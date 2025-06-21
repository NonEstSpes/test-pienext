import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { BookService } from '@/app/services/book.service';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { Book } from '@/app/model/book';
import { Subject, takeUntil } from 'rxjs';

import { BookCard } from '@/app/book-list/book-card/book-card';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  imports: [MatCardModule, BookCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList implements OnInit, OnDestroy {
  private readonly bookServices: BookService = inject(BookService);
  protected readonly books$$: Signal<Book[] | undefined> = toSignal(this.bookServices.allBooks);

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.bookServices.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
