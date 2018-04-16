import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import {    AuthService,    FacebookLoginProvider,    GoogleLoginProvider} from 'angular5-social-login';
import { SocialAuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) { }

  ngOnInit() {
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  // tslint:disable-next-line:member-ordering
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // tslint:disable-next-line:member-ordering
  passwordFormControl = new FormControl('', [ Validators.required, Validators.minLength(8)]);




  public facebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
              // this will return user data from facebook. What you need is a user token which you will send it to the server
              console.log(userData);
                this.socialAuthService.faceBookAuthMethod(userData.token);
       }
    );
}
  public googleLogin() {
    this.authService.authState.subscribe(
      (response) => {
        console.log(response);
      }
    );
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (response) => {
              // this will return user data from facebook. What you need is a user token which you will send it to the server
              console.log(response);
               // this.socialAuthService.faceBookAuthMethod(userData.token);
       }
    );
}
}
