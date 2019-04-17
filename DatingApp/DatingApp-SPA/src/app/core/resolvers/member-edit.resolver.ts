import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    console.log(Number.parseInt(this.authService.decodedToken.nameid, 10));

    return this.userService
      .getUser(Number.parseInt(this.authService.decodedToken.nameid, 10))
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/members']);
          return of(null);
        })
      );
  }
}
