import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {BookService} from '@/app/services/book.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Book} from '@/app/model/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  providers: [BookService],
  imports: [
    MatButton,
    MatCardModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookList {
  private readonly bookServices: BookService = inject(BookService)
  protected readonly books$$: Signal<Book[] | undefined> = toSignal(this.bookServices.getAllBooks());
}
