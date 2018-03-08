import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiConnectionService {
    
constructor(private httpClient: HttpClient){ }

getBreakingNewsfromAPI(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>('api/newsapi', { observe : 'response' } );
}
}