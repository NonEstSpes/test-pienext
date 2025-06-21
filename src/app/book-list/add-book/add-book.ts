import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-add-book',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
  ],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBook {}
