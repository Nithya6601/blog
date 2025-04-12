import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl.replace('/api', '')}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post<{ auth_token: string }>(`${this.baseUrl}/token/login`, data)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.auth_token);
        localStorage.setItem('username', data.username);
        console.log('Token saved to localStorage: ', response.auth_token);
      })
    );
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/users/me`, { headers});
  }
  
  signup(data: any) {
    return this.http.post(`${this.baseUrl}/users/`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
