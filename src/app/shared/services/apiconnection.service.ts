import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../modals/article';
import { TopHeadlines } from '../modals/top-headlines';

@Injectable()
export class ApiConnectionService {
    _baseUrl = 'http://localhost:5000/api/';
constructor(private httpClient: HttpClient) { }
getBreakingNewsfromAPI(): Observable<HttpResponse<TopHeadlines>> {
    return this.httpClient.get<TopHeadlines>( this._baseUrl + 'NewsApi', { observe : 'response' } );
}
}
