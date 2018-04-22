import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionsWrapper } from '../modals/cities-search';

@Injectable()
export class PlacesAPIService {
    private  _baseUrl = 'http://localhost:5000/api/cities';
    constructor(private httpClient: HttpClient) {

    }
getPlaces(q: string = null) {
return this.httpClient.get<PredictionsWrapper>(this._baseUrl + '/?q=' + q);
}

}
