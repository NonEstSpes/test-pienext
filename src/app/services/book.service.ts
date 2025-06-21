import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV, ENV_TOKEN } from '@/environments/environment.development';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Book } from '@/app/model/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly env: ENV = inject(ENV_TOKEN);

  private readonly book$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  public get allBooks(): Observable<Book[]> {
    return this.book$.asObservable();
  }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.env.apiUrl}/get_all_books`).pipe(tap(books => this.book$.next(books)));
  }
}
