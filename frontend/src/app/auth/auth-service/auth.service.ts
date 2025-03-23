import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  async login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/users/login', { email, password }).toPromise();
  }

  async signup(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/users/signup', { email, password }).toPromise();
  }

}
