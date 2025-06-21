import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { BookService } from '@/app/services/book.service';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';

import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { Book } from '@/app/model/book';

@Component({
  selector: 'app-book-item-list',
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  imports: [
    MatCardModule,
    MatChipSet,
    MatButton,
    MatChip,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList implements OnInit, OnDestroy {
  private readonly bookServices: BookService = inject(BookService);
  private readonly sourceBooks$$: Signal<Book[] | undefined> = toSignal(this.bookServices.allBooks);

  protected readonly books$$: WritableSignal<Book[] | undefined> = linkedSignal((): Book[] | undefined =>
    this.sourceBooks$$()
  );

  protected readonly formFilter: FormGroup = new FormGroup({
    filter: new FormControl<string>(''),
    typeFilter: new FormControl<string | null>(null, [Validators.required]),
  });

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.bookServices.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe();

    this.formFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.formFilter.invalid) return;
      this.books$$.set(
        this.sourceBooks$$()?.filter(val => {
          if (this.formFilter.value.typeFilter === 'author') {
            return val.author.includes(this.formFilter.value.filter);
          }
          return val.name.includes(this.formFilter.value.filter);
        })
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
