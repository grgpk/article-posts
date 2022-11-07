import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/user';
    return this.http.get(url).pipe(map(this.getUser));
  }

  updateCurrentUser(
    data: CurrentUserInputInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/user';
    return this.http.put(url, data).pipe(map(this.getUser));
  }
}
