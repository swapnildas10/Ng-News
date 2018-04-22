import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PlacesAPIService } from '../../shared/services/places-api.service';
import { PredictionsWrapper } from '../../shared/modals/cities-search';
import { FacebookLoginProvider, AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { SocialAuthService } from '../../shared/services/auth.service';
import { UserInfo } from '../../shared/modals/userinfo';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, ErrorStateMatcher {
  userInfo: UserInfo;
  hide = true;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  value = '';
  city = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.minLength(8), Validators.required]);
  SignUpForm: FormGroup;
  filteredStates: Observable<any[]>;
  cities: string[] = [];
  constructor(private cityAPIService: PlacesAPIService, private fb: FormBuilder,
    private socialAuthService: SocialAuthService, private authService: AuthService) {
    this.createForm();
    this.filteredStates = this.SignUpForm.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.cities.slice())
      ).debounceTime(1000).distinctUntilChanged();
      this.filteredStates.subscribe(value => {
        console.log(value);
        this.cityAPIService.getPlaces(this.SignUpForm.controls.city.value).subscribe(
          (response: PredictionsWrapper) => {
            this.cities = [];
            response.predictions.forEach(element => this.cities.push(element.description));
          }
        );
      });
   }
  ngOnInit() {
  }

  createForm() {
    this.SignUpForm = this.fb.group({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'city': this.city,
      'email': this.email,
      'password': this.password
    });
  }
  onCityInput(value: string) {
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  filterStates(name: string) {
    return this.cities.filter(state =>
      state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  facebookSignup() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
              // this will return user data from facebook. What you need is a user token which you will send it to the server
              console.log(userData);
                this.socialAuthService.faceBookAuthMethod(userData.token);
       }
    );
  }
  googleSignup() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (response) => {
              // this will return user data from facebook. What you need is a user token which you will send it to the server
              console.log(response);
               // this.socialAuthService.faceBookAuthMethod(userData.token);
       }
    );
  }

  onFormSubmit(form: FormGroup) {
    this.userInfo = new UserInfo();
    this.userInfo.email = form.value.email;
    this.userInfo.firstname = form.value.firstName;
    this.userInfo.lastname = form.value.lastName;
    this.userInfo.location = form.value.city;
  this.socialAuthService.userSignUp(form.value.email, form.value.password, this.userInfo);

  }
}
