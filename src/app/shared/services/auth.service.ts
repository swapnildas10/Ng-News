import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { UserInfo } from '../modals/userinfo';

@Injectable()
export class SocialAuthService {
    token: string;
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

    userLogin(email: string, password: string) {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then(
            (success) => {
                console.log(success);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
    userSignUp(email: string, password: string, userinfo: UserInfo) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (success) => {
                firebase.auth().currentUser.getToken().then(
                    (success1) => {
                        this.token = success1;
                        this.storeUserData(userinfo);
                    }
                );
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    getTokenfromFireBase() {
        firebase.auth().currentUser.getToken().then(
            (success) => {
                this.token = success;
            }
        ).catch(
            (error) => {
                this.token = null;
            }
        );
        return this.token;
    }

    storeUserData(userInfo: UserInfo) {
        console.log(userInfo);
        console.log('https://ngnews-201320.firebaseio.com/' +  firebase.auth().currentUser.uid + '.json?auth=' +
        this.token);
    this.httpClient.put('https://ngnews-201320.firebaseio.com/' +  firebase.auth().currentUser.uid + '.json?auth=' +
    this.token, userInfo);
    }
}
