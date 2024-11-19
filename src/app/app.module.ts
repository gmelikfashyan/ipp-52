import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule
import { HttpClientModule } from '@angular/common/http'; // Для работы с API

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,       // Добавляем сюда FormsModule
    HttpClientModule   // Добавляем HttpClientModule для работы с сервером
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
