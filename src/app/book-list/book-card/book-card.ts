import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Book } from '@/app/model/book';

@Component({
  selector: 'app-book-card',
  imports: [MatButton, MatCardModule, RouterLink],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCard {
  public book$$: InputSignal<Book> = input.required({
    alias: 'book',
  });
  public isItemList$$: InputSignal<boolean> = input.required({
    alias: 'isItemList',
  });
}
