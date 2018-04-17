import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PlacesAPIService } from '../../shared/services/places-api.service';
import { PredictionsWrapper } from '../../shared/modals/cities-search';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, ErrorStateMatcher {
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
  constructor(private cityAPIService: PlacesAPIService, private fb: FormBuilder) {
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

  }
  googleSignup() {

  }

  onFormSubmit(form: FormGroup) {
   console.log(form);

  }
}
