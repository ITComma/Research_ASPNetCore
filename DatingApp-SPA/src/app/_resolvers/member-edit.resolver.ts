import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

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
