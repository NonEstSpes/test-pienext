import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '@/app/model/genres';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '@/app/services/book.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-book',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatInput, ReactiveFormsModule, MatButton, RouterLink],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBook implements OnDestroy {
  private readonly bookService: BookService = inject(BookService);
  private readonly router: Router = inject(Router);
  private readonly destroy$: Subject<void> = new Subject<void>();

  protected readonly genres: string[] = Object.keys(Genre);
  protected readonly addBookForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(30)]),
    author: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(30)]),
    description: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
    detailed_description: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(1000)]),
    year: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d{4}$/.source)]),
    genre: new FormControl<Genre | null>(null, [Validators.required]),
    rating: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$/.source),
    ]),
  });

  protected addBook(): void {
    this.bookService
      .addBook({ ...this.addBookForm.value, id: generateNumericUUID(16), genre: [this.addBookForm.value.genre]})
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        alert('Книга успешно создана');
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function generateNumericUUID(length: number): number {
  let result = '';
  const digits = '0123456789';

  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return Number(result);
}
