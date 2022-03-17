import { environment } from './../../../environments/environment';
import { LoginClient } from './../../../shared/models/login-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: String;

  constructor(private readonly http: HttpClient) { }

  sendLoginClient( newUser: LoginClient) {
    this.http.post<any>(`${environment.endPointPousadaAnimal}/users/login/`, newUser).subscribe(data => {
      this.token = data
    })
    return this.token
  }
}
