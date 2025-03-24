import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { UserInfo } from '../../player/index/index.component';


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

  async signup(name: string, email: string, password: string) {
    return this.http.post(`${environment.backend}/api/users/signup`, { name, email, password }).toPromise();
  }

  async getCurrentUser(): Promise<{ user: UserInfo } | undefined> {
    const token = localStorage.getItem('TEST_TOKEN');
    if (!token) throw new Error('Token not found');
    return this.http.get<{ user: UserInfo }>(`${environment.backend}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).toPromise();
  }

}
