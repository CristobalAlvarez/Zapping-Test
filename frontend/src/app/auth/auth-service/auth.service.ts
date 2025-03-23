import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor(
    public router: Router
  ) { }

  async login(email: string, password: string) {
    return this.http.post(`${environment.backend}/api/users/login`, { email, password }).toPromise();
  }

  logout(): void {
    localStorage.removeItem('TEST_TOKEN');
    this.router.navigate(['']);
  }

  async signup(email: string, password: string) {
    return this.http.post(`${environment.backend}/api/users/signup`, { email, password }).toPromise();
  }

}
