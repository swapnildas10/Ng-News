import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SocialAuthService {
    constructor( private httpClient: HttpClient) {

    }
    faceBookAuthMethod(token: string): void {
        this.httpClient.post('url to facebook login here', { token: token } )
            .subscribe(onSuccess => {
                           // login was successful
                           // save the token that you got from your REST API in your preferred location i.e. as a Cookie or 
                           // LocalStorage as you do with normal login
                   }, onFail => {
                           // login was unsuccessful
                           // show an error message
                   }
            );
    }
}
