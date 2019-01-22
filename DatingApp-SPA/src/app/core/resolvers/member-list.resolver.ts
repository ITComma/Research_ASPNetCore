import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  // all way reset the pageIndex to 1 when routing to MemberListComponent
  pageIndex = 1;
  pageSize = 5;

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  // ================================================
  // =              BUSINESS METHODS                =
  // ================================================

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService
      .getUsers(this.pageIndex, this.pageSize)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
