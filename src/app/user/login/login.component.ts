import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {    AuthService,    FacebookLoginProvider,    GoogleLoginProvider} from 'angular5-social-login';
import { SocialAuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  LoginForm: FormGroup;
  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  createForm() {
    this.LoginForm = this.fb.group({
      'email': this.email,
      'password': this.password
    });
  }

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
              this.email.setValue(response.email);
              console.log(response);
               // this.socialAuthService.faceBookAuthMethod(userData.token);
       }
    );
}

onFormSubmit(form: FormGroup) {
 this.socialAuthService.userLogin(form.value.email, form.value.password);
}
}
