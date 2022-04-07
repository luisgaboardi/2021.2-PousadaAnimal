import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { Pet } from 'src/app/shared/models/pet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPetsService {

  constructor(private http: HttpClient, private router: Router) { }

  getPetData(user:User): Observable<Pet[]> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${user.id}/pets`)
  }
}
