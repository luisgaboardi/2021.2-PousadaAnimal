import { environment } from './../../../environments/environment';
import { LoginClient } from './../../../shared/models/login-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  sendLoginClient( requestData: LoginClient) {
    return this.http.post<any>(`${environment.endPointPousadaAnimal}/users/login/`, requestData).subscribe(token => {
      let user: User = {
        email: requestData.email,
        token: token,
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

}
