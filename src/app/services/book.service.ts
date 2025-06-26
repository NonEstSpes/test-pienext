import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV, ENV_TOKEN } from '@/environments/environment.development';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Book } from '@/app/model/book';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly env: ENV = inject(ENV_TOKEN);

  private readonly book$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  public get allBooks(): Observable<Book[]> {
    console.log('req');
    return this.book$.asObservable();
  }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.env.apiUrl}/get_all_books`).pipe(
      tap(books => this.book$.next(books)),
      tap(val => {
        console.log(val);
      })
    );
  }

  public addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${this.env.apiUrl}/get_all_books`, newBook);
  }
}
