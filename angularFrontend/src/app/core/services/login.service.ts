import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'src/shared/models/user';
import { Router } from '@angular/router';
import { LoginResponse } from './../../../shared/models/LoginResponse';
import { environment } from './../../../environments/environment';
import { LoginClient } from './../../../shared/models/login-client';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // @BlockUI() blockUI: NgBlockUI;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    // this.userSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('currentUser'))
    // );
  }

  sendLoginClient( requestData: LoginClient): Observable<LoginResponse>{
    return this.http.post<any>(`${environment.endPointPousadaAnimal}/users/login/`,
     requestData
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // this.blockUI.reset();
    this.router.navigate(['auth/login']);
    // this.userSubject.next(null);
  }

  public GetUser(): User{
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    return user;
  }

  public GetToken(): string{
    const token = JSON.parse(localStorage.getItem('token')!) as string;
    return token;
  }
}
