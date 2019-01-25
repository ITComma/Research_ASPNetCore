import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  // all way reset the pageIndex to 1 when routing to MessagesComponent
  pageIndex = 1;
  pageSize = 5;
  messgaeContainer = 'Unread';

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

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService
      .getMessages(this.authService.decodedToken.nameid, this.pageIndex, this.pageSize, this.messgaeContainer)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
