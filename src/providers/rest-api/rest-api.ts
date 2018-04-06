import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Article } from '../../model/article';
import { CommentStmt } from '@angular/compiler/src/output/output_ast';

/*
  Generated class for the RestApiProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestApiProvider {
  private baseUrl = 'http://lara.test';

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  // id portlet deve essere memorizzato nel db e chiesto all'utente
  getArticles(id: string): Observable<any> {
    const params = new HttpParams().set('json','1').set('portletid', id);
    return this.http.get(this.baseUrl+"/articles", { params: params} );
  }

  getArticle(url: string): Observable<Article> {
    const params = new HttpParams().set('json','1');
    return this.http.get<Article>(url, { params: params} );
  }

  newArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl + '/article', article);
  }

}
