import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  url = 'http://localhost:8080/report/public';


  constructor(private http: HttpClient) { }

  findAllBooks(): Observable<any[]>{
      return this.http.get<[]>(this.url + '/book/find-all')
  }

  findAllCategories(): Observable<any[]>{
    return this.http.get<[]>(this.url + '/category/find-all')
  }

  findAllAuthors(): Observable<any[]>{
    return this.http.get<[]>(this.url + '/author/find-all')
  }
}
