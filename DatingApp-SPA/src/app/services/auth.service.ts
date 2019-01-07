import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  private baseUrl = 'http://localhost:5000/api/auth/';

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
        }
      })
    );
  }
}
