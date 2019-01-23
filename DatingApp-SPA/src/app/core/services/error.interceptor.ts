import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          // Maniputate Unauthorize Error
          if (errorResponse.status === 401) {
            return throwError(errorResponse.statusText);
          }

          // Manipulate Application Logic Error
          const applicationError = errorResponse.headers.get(
            'Application-Error'
          );
          if (applicationError) {
            console.error(applicationError);

            return throwError(applicationError);
          }

          // Manipulate Server Error
          const serverError = errorResponse.error;
          let modelStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            // tslint:disable-next-line:forin
            for (const key in serverError.errors) {
              modelStateErrors += serverError.errors[key] + '\n';
            }
          }

          return throwError(modelStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
