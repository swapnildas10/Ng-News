import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line:member-ordering
  email = new FormControl('', [Validators.required, Validators.email]);
  // tslint:disable-next-line:member-ordering
  firstname = new FormControl('', [Validators.required]);
  // tslint:disable-next-line:member-ordering
  lastname = new FormControl('', [Validators.required]);
  // tslint:disable-next-line:member-ordering
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError) {
      return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
          '';
    }
    if (this.firstname.hasError) {
      return this.firstname.hasError('required') ? 'You must enter a value' :
      this.firstname.hasError('firstname') ? 'Not a valid email' :
          '';
    }
    if (this.lastname.hasError) {
      return this.lastname.hasError('required') ? 'You must enter a value' :
      this.lastname.hasError('lastname') ? 'Not a valid email' :
          '';
    }
    if (this.password.hasError) {
      return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' :
          '';
    }
  }
}
