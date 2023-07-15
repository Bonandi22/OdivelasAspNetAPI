import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = `${environment.mainUrlAPI}`;

  constructor(private http: HttpClient) {}

  LoginUser(requestLogin: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/login`, requestLogin);
  }
  setAuthToken(token: string) {
    localStorage.setItem('token', token);
  }
  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  getUserName(login: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.apiUrl}/User/${login}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getUserByName(login: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/${login}`);
  }
}
