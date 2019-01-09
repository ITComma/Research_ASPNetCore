import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  decodedToken: any;

  private baseUrl = environment.apiUrl + 'auth/';

  private jwtHelper = new JwtHelperService();

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private http: HttpClient) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  login(model: { username: string; password: string }) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken(user.token);
        }
        return response;
      })
    );
  }

  register(model: { username: string; password: string }) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token?: string): boolean {
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      return true;
    }
    const existedToken = localStorage.getItem('token');
    if (existedToken == null) {
      return false;
    }

    this.decodedToken = this.jwtHelper.decodeToken(existedToken);
    return true;
  }
}
