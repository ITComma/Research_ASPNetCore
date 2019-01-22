import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { PaginatedResult } from '../models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // ==========================================
  // =           Attributes Section           =
  // ==========================================

  baseUrl = environment.apiUrl;

  // ==========================================
  // =          Constructors Section          =
  // ==========================================

  constructor(private http: HttpClient) {}

  // ==========================================
  // =            Business Methods            =
  // ==========================================

  getUsers(
    pageIndex?,
    pageSize?,
    userParams?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (pageIndex != null && pageSize != null) {
      params = params.append('pageIndex', pageIndex);
      params = params.append('pageSize', pageSize);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
      console.log(userParams.orderBy);
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', {
        observe: 'response',
        params: params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
