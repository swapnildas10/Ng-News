import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../modals/article';
import { TopHeadlines } from '../modals/top-headlines';
import { Source } from '../modals/source';

@Injectable()
export class ApiConnectionService {
    _baseUrl = 'http://localhost:5000/api/';
constructor(private httpClient: HttpClient) { }
getBreakingNewsfromAPI(): Observable<HttpResponse<TopHeadlines>> {
    return this.httpClient.get<TopHeadlines>( this._baseUrl + 'TopUSNews', { observe : 'response' } );
}

getSourcesfromAPI(category: string = null, language: string = null, country: string = null): Observable<HttpResponse<Source>> {
    return this.httpClient.get<Source>(
        this._baseUrl + 'Source' + '?category=' + category + '&language=' + language + '&country=' + country ,
        { observe : 'response'} );
}
}
