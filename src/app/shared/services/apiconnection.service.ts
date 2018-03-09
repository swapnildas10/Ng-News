import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../modals/article';
import { TopHeadlines } from '../modals/top-headlines';
import { Source, SourceWrapper } from '../modals/source';
import { SearchQueryModal } from '../modals/searchquerymodal';

@Injectable()
export class ApiConnectionService {
    _baseUrl = 'http://localhost:5000/api/';
constructor(private httpClient: HttpClient) { }
getBreakingNewsfromAPI(country: string = null, category: string = null,
    sources: string = null, q: string = null, pageSize: number = null, page: number = null ): Observable<HttpResponse<TopHeadlines>> {

        this._baseUrl  = this._baseUrl + 'TopUSNews?';
        if (category != null && category.toLocaleLowerCase() !== 'null') {
            this._baseUrl = this._baseUrl + 'category=' + category;
        }
        if (country != null && country.toLocaleLowerCase() !== 'null') {
            this._baseUrl = this._baseUrl + 'country=' + country;
        }
        if (sources != null && sources.toLocaleLowerCase() !== 'null') {
            this._baseUrl = this._baseUrl + '?sources=' + sources;
        }
        if (q != null && q.toLocaleLowerCase() !== 'null') {
            this._baseUrl = this._baseUrl + '&q=' + q;
        }
        if (pageSize != null) {
            this._baseUrl = this._baseUrl + '&pageSize=' + pageSize;
        }
        if (page != null ) {
            this._baseUrl = this._baseUrl + '?page=' + page;
        }
    return this.httpClient.get<TopHeadlines>( this._baseUrl , { observe : 'response' } );
}

getSourcesfromAPI(category: string = null, language: string = null, country: string = null): Observable<HttpResponse<SourceWrapper>> {
    this._baseUrl = this._baseUrl + 'Source';
    if (category != null && category.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?category=' + category;
    }
    if (language != null && language.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?language=' + language;
    }
    if (country != null && country.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?country=' + country;
    }
    return this.httpClient.get<SourceWrapper>(
        this._baseUrl ,
        { observe : 'response'} );
}


getQueryResultfromAPI(q: string = null, sources: string = null, domain: string = null,
    from: string = null, to: string = null, language: string = null, sortBy: string = null,
    pageSize: number = null, page: number = null ): Observable<HttpResponse<SearchQueryModal>> {
    this._baseUrl = this._baseUrl + 'Source';
    if (q != null && q.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?q=' + q;
    }
    if (sources != null && sources.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?sources=' + sources;
    }
    if (domain != null && domain.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?domain=' + domain;
    }
    if (from != null && from.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?from=' + from;
    }
    if (to != null && to.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?to=' + to;
    }
    if (language != null && language.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?language=' + language;
    }
    if (sortBy != null && sortBy.toLocaleLowerCase() !== 'null') {
        this._baseUrl = this._baseUrl + '?sortBy=' + sortBy;
    }
    if (pageSize != null) {
        this._baseUrl = this._baseUrl + '?domain=' + pageSize;
    }
    if (page != null) {
        this._baseUrl = this._baseUrl + '?page=' + page;
    }
    return this.httpClient.get<SearchQueryModal>(
        this._baseUrl ,
        { observe : 'response'} );
}
}
