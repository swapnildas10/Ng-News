import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../modals/article';
import { TopHeadlines } from '../modals/top-headlines';
import { Source, SourceWrapper } from '../modals/source';
import { SearchQueryModal } from '../modals/searchquerymodal';

@Injectable()
export class ApiConnectionService {
   private  _baseUrl = 'http://localhost:5000/api/';
constructor(private httpClient: HttpClient) { }
getBreakingNewsfromAPI(country: string = null, category: string = null,
    sources: string = null, q: string = null, pageSize: number = null, page: number = null ): Observable<HttpResponse<TopHeadlines>> {

      let url = this._baseUrl + 'TopUSNews?';
        if (category != null && category.toLocaleLowerCase() !== 'null') {
            url = url + 'category=' + category;
        }
        if (country != null && country.toLocaleLowerCase() !== 'null') {
            url = url + 'country=' + country;
        }
        if (sources != null && sources.toLocaleLowerCase() !== 'null') {
            url = url + '?sources=' + sources;
        }
        if (q != null && q.toLocaleLowerCase() !== 'null') {
            url = url + '&q=' + q;
        }
        if (pageSize != null) {
            url = url + '&pageSize=' + pageSize;
        }
        if (page != null ) {
            url = url + '?page=' + page;
        }
    return this.httpClient.get<TopHeadlines>(url , { observe : 'response' } );
}
getTopNewsByCategoryfromAPI(country: string = null, category: string = null,
    sources: string = null, q: string = null, pageSize: number = null, page: number = null ): Observable<HttpResponse<TopHeadlines>> {

       let url = this._baseUrl + 'TopNewsByCategory?';
        if (category != null && category.toLocaleLowerCase() !== 'null') {
            url = url + 'category=' + category;
        }
        if (country != null && country.toLocaleLowerCase() !== 'null') {
            url = url + '&country=' + country;
        }
        if (sources != null && sources.toLocaleLowerCase() !== 'null') {
            url = url + '?sources=' + sources;
        }
        if (q != null && q.toLocaleLowerCase() !== 'null') {
            url = url + '&q=' + q;
        }
        if (pageSize != null) {
            url = url + '&pageSize=' + pageSize;
        }
        if (page != null ) {
            url = url + '?page=' + page;
        }
        console.log(url);
    return this.httpClient.get<TopHeadlines>(url , { observe : 'response' } );
}

getSourcesfromAPI(category: string = null, language: string = null, country: string = null): Observable<HttpResponse<SourceWrapper>> {
   let url = this._baseUrl + 'Source';
    if (category != null && category.toLocaleLowerCase() !== 'null') {
        url = url + + '?category=' + category;
    }
    if (language != null && language.toLocaleLowerCase() !== 'null') {
        url = url + + '?language=' + language;
    }
    if (country != null && country.toLocaleLowerCase() !== 'null') {
        url = url + + '?country=' + country;
    }
    return this.httpClient.get<SourceWrapper>(
       url ,
        { observe : 'response'} );
}


getQueryResultfromAPI(q: string = null, sources: string = null, domain: string = null,
    from: string = null, to: string = null, language: string = null, sortBy: string = null,
    pageSize: number = null, page: number = null ): Observable<HttpResponse<SearchQueryModal>> {
    let url = this._baseUrl + 'Source';
    if (q != null && q.toLocaleLowerCase() !== 'null') {
        url = url + + '?q=' + q;
    }
    if (sources != null && sources.toLocaleLowerCase() !== 'null') {
        url = url + + '?sources=' + sources;
    }
    if (domain != null && domain.toLocaleLowerCase() !== 'null') {
        url = url + + '?domain=' + domain;
    }
    if (from != null && from.toLocaleLowerCase() !== 'null') {
        url = url + + '?from=' + from;
    }
    if (to != null && to.toLocaleLowerCase() !== 'null') {
        url = url + + '?to=' + to;
    }
    if (language != null && language.toLocaleLowerCase() !== 'null') {
        url = url  + '?language=' + language;
    }
    if (sortBy != null && sortBy.toLocaleLowerCase() !== 'null') {
        url = url + + '?sortBy=' + sortBy;
    }
    if (pageSize != null) {
        url = url + + '?domain=' + pageSize;
    }
    if (page != null) {
        url = url + + '?page=' + page;
    }
    return this.httpClient.get<SearchQueryModal>(
      url ,
        { observe : 'response'} );
}
}
