import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {

  public loginForm: FormGroup;
  public submitted = false;
  public error = false;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.loginForm.disable();
    this.AuthService.login(this.loginForm.value.email, this.loginForm.value.password).then((response) => {
      if (!response) return;
      localStorage.setItem('TEST_TOKEN', String((response as LoginResponse).token));
      this.router.navigateByUrl('player')
    }).catch(() => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
      this.loginForm.enable();
    })
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName) as FormControl;
    return control.hasError(errorName);
  }

}
