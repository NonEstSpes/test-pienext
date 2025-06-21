import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '@/app/model/genres';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-book',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatInput, ReactiveFormsModule, MatButton, RouterLink],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBook {
  protected readonly genres: string[] = Object.keys(Genre);
  protected readonly addBookForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(30)]),
    author: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(30)]),
    description: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
    details: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(1000)]),
    year: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d{4}$/.source)]),
    genre: new FormControl<Genre | null>(null, [Validators.required]),
    rating: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$/.source)]),
  });
}
