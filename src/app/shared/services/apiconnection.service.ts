import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiConnectionService {
    private API_KEY = '367fcf68f19b4595b91d2d242085686d';
constructor(private httpClient: HttpClient){ }

getBreakingNewsfromAPI(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.API_KEY, { observe : 'response' } );
}
}