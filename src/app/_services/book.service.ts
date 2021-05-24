﻿import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Book} from '@app/_models/book';

@Injectable({providedIn: 'root'})
export class BookService {
  private bookSubject: BehaviorSubject<Book>;
  public book: Observable<Book>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.bookSubject = new BehaviorSubject<Book>(JSON.parse(localStorage.getItem('book')));
    this.book = this.bookSubject.asObservable();
  }

  findInGoogleApi(keyword: string) {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=` + keyword);
  }

}
