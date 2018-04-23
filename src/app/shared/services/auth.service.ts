import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { UserInfo } from '../modals/userinfo';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class SocialAuthService {
    token: string;
    constructor( private httpClient: HttpClient,  public snackBar: MatSnackBar, private router: Router) {

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
                firebase.auth().currentUser.getToken().then(
                    (token) => {
                        this.token = token;
                        this.snackBar.open('LOGIN', 'Success', {
                            duration: 2000
                        });
                        this.router.navigate(['/Dashboard']);
                    }
                ).catch(
                    (token) => {
                        this.token = null;
                    }
                );
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
    userSignOut() {
        firebase.auth().signOut().then(
            (success) => {
                this.token = null;
                this.router.navigate(['/Login']);
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
    isAuthenticated() {
        return this.token != null;
    }
    storeUserData(userInfo: UserInfo) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            location: userInfo.location
        });
    }
}
