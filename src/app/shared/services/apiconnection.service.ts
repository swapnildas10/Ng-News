import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../modals/article';
import { TopHeadlines } from '../modals/top-headlines';
import { Source, SourceWrapper } from '../modals/source';
import { SearchQueryModal } from '../modals/searchquerymodal';
import { WeatherWrapper, CurrentWeather } from '../modals/weather';
import { CompanyLogo } from '../modals/company-logo';
import 'rxjs/add/operator/map';
import { DomainLogo } from '../modals/domain-logo';
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
            if (category) {
                url = url + '&country=' + country;
            } else {
                url = url + 'country=' + country;
            }
        }
        if (sources != null && sources.toLocaleLowerCase() !== 'null') {
            if (category) {
                url = url + '&sources=' + sources;
            } else {
                if (country) {
                    url = url + '&sources=' + sources;
                } else {
                    url = url + 'sources=' + sources;
                }
            }
        }
        if (q != null && q.toLocaleLowerCase() !== 'null') {
            if (category) {
                url = url + '&q=' + q;
            } else {
                if (sources || category || country) {
                    url = url + '&q=' + q;
                } else {
                    url = url + 'q=' + q;
                }
            }
        }
        if (pageSize != null) {
            if (category) {
                url = url + '&pageSize=' + pageSize;
            } else {
                if (sources || q || category || country) {
                    url = url + '&pageSize=' + pageSize;
                } else {
                    url = url + 'pageSize=' + pageSize;
                }
            }
        }
        if (page != null ) {
            if (category) {
                url = url + '&page=' + page;
            } else {
                if (sources || q || category || pageSize || country) {
                    url = url + 'page=' + page;
                } else {
                    url = url + 'page=' + page;
                }
            }
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
            if (category === null) {
                url = url + 'country=' + country;
            } else {
                url = url + '&country=' + country;
            }
        }
        if (sources != null && sources.toLocaleLowerCase() !== 'null') {
            if ( category === null && country === null) {
                url = url + 'sources=' + sources;
            } else {
                url = url + '&sources=' + sources;
            }
        }
        if (q != null && q.toLocaleLowerCase() !== 'null') {
            if ( category === null && country === null && sources === null) {
                url = url + 'q=' + q;
            } else {
                url = url + '&q=' + q;
            }
        }
        if (pageSize != null) {
            if ( category === null && country === null && sources === null && q === null) {
                url = url + 'pageSize=' + pageSize;
            } else {
                url = url + '&pageSize=' + pageSize;
            }
        }
        if (page != null ) {
            if ( category === null && country === null && sources === null && q === null && pageSize === null) {
                url = url + 'page=' + page;
            } else {
                url = url + '&page=' + page;
            }
        }
        console.log(url);
    return this.httpClient.get<TopHeadlines>(url , { observe : 'response' } );
}

getSourcesfromAPI(category: string = null, language: string = null, country: string = null): Observable<HttpResponse<SourceWrapper>> {
   let url = this._baseUrl + 'Source';
    if (category != null && category.toLocaleLowerCase() !== 'null') {
        url = url + + '?category=' + category;
    }
    if (language != null && language.toLocaleLowerCase() !== 'null' ) {
        if (category == null) {
            url = url + + '?language=' + language;
        } else {
            url = url + + '&language=' + language;
        }
    }
    if (country != null && country.toLocaleLowerCase() !== 'null') {
        if (category == null && language == null) {
            url = url + + '?country=' + country;
        } else {
            url = url + + '&country=' + country;
        }
    }
    console.log(url);
    return this.httpClient.get<SourceWrapper>(
       url ,
        { observe : 'response'} );
}


getQueryResultfromAPI(q: string = null, sources: string = null, domain: string = null,
    from: string = null, to: string = null, language: string = null, sortBy: string = null,
    pageSize: number = null, page: number = null ): Observable<HttpResponse<SearchQueryModal>> {
    let url = this._baseUrl + 'Query';
    if (q != null && q.toLocaleLowerCase() !== 'null') {
        url = url  + '?q=' + q;
    }
    if (sources != null && sources.toLocaleLowerCase() !== 'null' ) {
        if (q == null) {
            url = url  + '?sources=' + sources;
        } else {
            url = url  + '&sources=' + sources;
        }
    }
    if (domain != null && domain.toLocaleLowerCase() !== 'null') {
        if (q == null && sources == null) {
            url = url  + '?domain=' + domain;
        } else {
            url = url  + '&domain=' + domain;
        }
    }
    if (from != null && from.toLocaleLowerCase() !== 'null') {
        if (q == null && sources == null && domain == null) {
            url = url  + '?from=' + from;
        } else {
            url = url  + '&from=' + from;
        }
    }
    if (to != null && to.toLocaleLowerCase() !== 'null') {
        if (q == null && sources == null && domain == null && from == null) {
            url = url  + '?to=' + to;
        } else {
            url = url  + '&to=' + to;
        }
    }
    if (language != null && language.toLocaleLowerCase() !== 'null') {
        if (q == null && sources == null && domain == null && from == null && to == null) {
            url = url  + '?language=' + language;
        } else {
            url = url  + '&language=' + language;
        }
    }
    if (sortBy != null && sortBy.toLocaleLowerCase() !== 'null') {
        if (q == null && sources == null && domain == null && from == null && to == null && language == null) {
            url = url  + '?sortBy=' + sortBy;
        } else {
            url = url  + '&sortBy=' + sortBy;
        }
    }
    if (pageSize != null) {
        if (q == null && sources == null && domain == null && from == null && to == null && language == null && sortBy == null) {
            url = url  + '?domain=' + pageSize;
        } else {
            url = url  + '&domain=' + pageSize;
        }
    }
    if (page != null) {
        if (q == null && sources == null && domain == null && from == null && to == null && 
            language == null && sortBy == null && pageSize == null) {
            url = url  + '?page=' + page;
        } else {
            url = url  + '&page=' + page;
        }
    }
    console.log(url);
    return this.httpClient.get<SearchQueryModal>(
      url ,
        { observe : 'response'} );
}

getWeatherDataByZipCodeAPI(zipcode: string = '90815 ') {
 const url = this._baseUrl + 'weeklyweather?zipcode=' + zipcode;
 return this.httpClient.get<WeatherWrapper>(url, {observe : 'response'});
}

getCurrentWeatherDataByZipCodeAPI(zipcode: string = '90815 ') {
 const url = this._baseUrl + 'currentweather?zipcode=' + zipcode;
 return this.httpClient.get<CurrentWeather>(url, {observe : 'response'});
}


getCompanyLogo(name: string) {
    const url = this._baseUrl + 'companylogo?name='.concat(name);
        return this.httpClient.get<CompanyLogo>(url, {observe : 'response'});
}
getCompanyLogoByDomain(name: string) {
    const url = this._baseUrl + 'companylogo?name=' + name;
    return this.httpClient.get<DomainLogo>(url, {observe : 'response'});
}
}
