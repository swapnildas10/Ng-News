import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { PredictionsWrapper } from '../../shared/modals/cities-search';
import { PlacesAPIService } from '../../shared/services/places-api.service';
import { FormBuilder, FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { SocialAuthService } from '../../shared/services/auth.service';
import { UserInfo } from '../../shared/modals/userinfo';
import { Observable } from 'rxjs';
import { startWith ,  map } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import {MatSlideToggle} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, ErrorStateMatcher {
  userInfo: UserInfo;
  hide = true;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  value = '';
  city = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  UserDetailsForm: FormGroup;
  filteredStates: Observable<any[]>;
  cities: string[] = [];
  checked = false;
  formValueChanged = false;
  constructor(private cityAPIService: PlacesAPIService, private fb: FormBuilder,
    private socialAuthService: SocialAuthService, private authService: AuthService) {
    this.createForm();
    this.UserDetailsForm.disable();
    this.filteredStates = this.UserDetailsForm.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.cities.slice())
      ).debounceTime(1000).distinctUntilChanged();
      this.filteredStates.subscribe(value => {
        this.cityAPIService.getPlaces(this.UserDetailsForm.controls.city.value).subscribe(
          (response: PredictionsWrapper) => {
            this.cities = [];
            response.predictions.forEach(element => this.cities.push(element.description));
          }
        );
      });
   }
   ngOnInit() {
    this.socialAuthService.userDetails.subscribe(
      response => {
        console.log(response);
        this.UserDetailsForm.setValue({
          firstName: response['firstname'],
          lastName: response['lastname'],
          city: response['location'],
          email: response['email']
        });
      },
      error => {
        console.log(error);
      }
    );
     this.socialAuthService.getUserData();
        this.UserDetailsForm.controls['firstName'].valueChanges.subscribe(
          (firstname: string) => {
           if (this.UserDetailsForm.controls['firstName'].value !== firstname) {
            this.formValueChanged = true;
           } else {
            this.formValueChanged = false;
          }
          }
        );
        this.UserDetailsForm.controls['lastName'].valueChanges.subscribe(
          (lastname: string) => {
            if (this.UserDetailsForm.controls['lastName'].value !== lastname) {
              this.formValueChanged = true;
             } else {
              this.formValueChanged = false;
            }
          }
        );
        this.UserDetailsForm.controls['city'].valueChanges.subscribe(
          (city: string) => {
            if (this.UserDetailsForm.controls['city'].value !== city) {
              this.formValueChanged = true;
             } else {
              this.formValueChanged = false;
            }
          }
        );
        this.UserDetailsForm.controls['email'].valueChanges.subscribe(
          (email: string) => {
            if (this.UserDetailsForm.controls['email'].value !== email) {
              console.log(this.UserDetailsForm.controls['email'].value );
              this.formValueChanged = true;
             } else {
              this.formValueChanged = false;
            }
          }
        );
  }
  createForm() {
    this.UserDetailsForm = this.fb.group({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'city': this.city,
      'email': this.email
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

  onToggleClicked() {
    this.checked = !this.checked;
    if (!this.checked) {
      this.UserDetailsForm.disable();
    } else {
      this.UserDetailsForm.enable();
    }
  }
}
