import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { UserInfo } from '../modals/userinfo';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SocialAuthService {
    token: string;
    userDetails = new Subject<Object>();
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
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (success) => {
                firebase.auth().currentUser.getIdToken().then(
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
                localStorage.removeItem('token');
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
                firebase.auth().currentUser.getIdToken().then(
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
        firebase.auth().currentUser.getIdToken().then(
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
        if (JSON.parse(localStorage.getItem('token')) != null) {
        return true;
        }
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

    getUserData() {
          firebase.database().ref('users/' + firebase.auth().currentUser.uid  ).once('value',
          this.firebaseSuccessCallback.bind(this), function(error) {
              console.log(error);
        });
    }

    firebaseSuccessCallback(snapshot) {
        this.userDetails.next(snapshot.val());
    }
}
