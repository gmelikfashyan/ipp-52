import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books`);
  }

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/authors`);
  }

  addBook(book: { title: string; author: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }

  addAuthor(author: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authors`, author);
  }
}
