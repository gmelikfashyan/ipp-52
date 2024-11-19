import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <div class="container">
      <h1>Books Manager</h1>

      <!-- Форма для добавления книги -->
      <form (submit)="addBook()">
        <input
          [(ngModel)]="newBook.title"
          name="title"
          placeholder="Book Title"
          required
        />
        <select [(ngModel)]="newBook.author" name="author" required>
          <option *ngFor="let author of authors" [value]="author._id">
            {{ author.name }}
          </option>
        </select>
        <button type="submit">Add Book</button>
      </form>

      <h2>Books List</h2>
      <ul>
        <li *ngFor="let book of books">
          <strong>{{ book.title }}</strong> by {{ book.author.name }}
        </li>
      </ul>

      <!-- Форма для добавления автора -->
      <h2>Add New Author</h2>
      <form (submit)="addAuthor()">
        <input
          [(ngModel)]="newAuthor.name"
          name="name"
          placeholder="Author Name"
          required
        />
        <button type="submit">Add Author</button>
      </form>

      <h2>Authors List</h2>
      <ul>
        <li *ngFor="let author of authors">
          {{ author.name }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      * {
        font-family: Arial;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
      }
      form {
        margin-bottom: 20px;
      }
      input,
      select {
        margin: 5px;
        padding: 8px;
        font-size: 16px;
      }
      button {
        padding: 8px 16px;
        font-size: 16px;
      }
      li {
        font-size: 20px;
        list-style-type: none;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  books: any[] = [];
  authors: any[] = [];
  newBook = { title: '', author: '' };
  newAuthor = { name: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  loadAuthors(): void {
    this.apiService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }

  addBook(): void {
    if (!this.newBook.title || !this.newBook.author) return;

    this.apiService.addBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '' };
      this.loadBooks();
    });
  }

  addAuthor(): void {
    if (!this.newAuthor.name) return;

    this.apiService.addAuthor(this.newAuthor).subscribe(() => {
      this.newAuthor = { name: '' };  // Очистить форму после добавления
      this.loadAuthors();  // Обновить список авторов
    });
  }

  getAuthorName(authorId: string): string {
    const author = this.authors.find((a) => a._id === authorId);
    return author ? author.name : 'Unknown';
  }
}
