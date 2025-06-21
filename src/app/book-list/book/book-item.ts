import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { BookService } from '@/app/services/book.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {toSignal} from '@angular/core/rxjs-interop';
import {Book} from '@/app/model/book';

import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-book-item',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatChip, MatChipSet, MatCardActions, MatButton, RouterLink],
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
    this.idBook$$.set(Number(activateRoot.snapshot.params['id']));
  }
}
