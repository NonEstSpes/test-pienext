import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV, ENV_TOKEN} from '@/environments/environment.development';
import {Observable} from 'rxjs';
import {Book} from '@/app/model/book';

@Injectable()
export class BookService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly env: ENV = inject(ENV_TOKEN)

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.env.apiUrl}/get_all_books`)
  }
}
