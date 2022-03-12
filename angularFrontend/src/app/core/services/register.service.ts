import { environment } from './../../../environments/environment';
import { RegisterClient } from './../../../shared/models/register-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  sendRegisterClient( newUser: RegisterClient): Observable<RegisterClient>{
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/users`, newUser
    )
  }
}
