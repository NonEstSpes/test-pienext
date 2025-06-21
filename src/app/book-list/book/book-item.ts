import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import { BookService } from '@/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AddBook } from '@/app/book-list/add-book/add-book';
import {BookCard} from '@/app/book-list/book-card/book-card';
import {toSignal} from '@angular/core/rxjs-interop';
import {Book} from '@/app/model/book';

@Component({
  selector: 'app-book-item',
  imports: [AddBook, BookCard],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItem {
  private readonly bookService: BookService = inject(BookService);
  private readonly idBook$$: WritableSignal<number> = signal(0);
  private readonly books$$: Signal<Book[] | undefined> = toSignal(this.bookService.allBooks)

  protected readonly book$$: Signal<Book | undefined> = computed(() =>
    this.books$$()?.find(book => book.id === this.idBook$$())
  )

  constructor(private activateRoot: ActivatedRoute) {
    this.idBook$$.set(activateRoot.snapshot.params['id']);
  }
}
