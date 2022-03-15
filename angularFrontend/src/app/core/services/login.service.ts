import { environment } from './../../../environments/environment';
import { LoginClient } from './../../../shared/models/login-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  sendLoginClient( newUser: LoginClient): Observable<LoginClient>{
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/users/login`, newUser
    )
  }
}
