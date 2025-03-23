import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class SignUpComponent {


  public signUpForm: FormGroup;
  public submitted = false;
  public customError: undefined | 'unique';
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_again: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    this.customError = undefined;
    this.submitted = true;
    if (this.signUpForm.invalid) return;
    if (!this.checkIfPasswordsAreEqual()) return;
    this.loading = true;
    this.signUpForm.disable();
    this.AuthService.signup(this.signUpForm.value.email, this.signUpForm.value.password).then(() => {
      this.submitted = false;
      this.router.navigate(['']);
    }).catch((error) => {
      if (error.error && error.error.error && error.error.error.includes('unique')) {
        this.customError = 'unique';
      }
    }).finally(() => {
      this.loading = false;
      this.signUpForm.enable();
    })
  }

  hasError(controlName: string, errorName: string) {
    const control = this.signUpForm.get(controlName) as FormControl;
    const value = control.value;
    if (String(value).length === 0) return true;
    return control.hasError(errorName);
  }

  checkIfPasswordsAreEqual() {
    const password = this.signUpForm.get('password') as FormControl;
    const password_again = this.signUpForm.get('password_again') as FormControl;
    console.log(password.value, password_again.value);
    return password.value === password_again.value;
  }


}
