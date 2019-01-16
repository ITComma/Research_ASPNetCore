import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  decodedToken: any;

  user = new BehaviorSubject<User>(null);
  currentUser = this.user.asObservable();

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
          this.decodeToken(user.token);
          this.getCurrentUser(user.user);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.changeUserInfo(null);
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
      localStorage.setItem('token', token);
      return true;
    }

    const existedToken = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(existedToken);
    return true;
  }

  getCurrentUser(user?: User): boolean {
    if (user) {
      this.changeUserInfo(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }

    this.changeUserInfo(JSON.parse(localStorage.getItem('user')));
    return true;
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  changeUserInfo(user: User) {
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  changeUserPhoto(photoUrl: string) {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    savedUser.photoUrl = photoUrl;
    this.user.next(savedUser);
    localStorage.setItem('user', JSON.stringify(savedUser));
  }
}
