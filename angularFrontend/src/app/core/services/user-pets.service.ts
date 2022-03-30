import { environment } from './../../../environments/environment';
import { LoginClient } from './../../../shared/models/login-client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/shared/models/user.model';
import { Router } from '@angular/router';
import { Pet } from 'src/shared/models/pet';

@Injectable({
  providedIn: 'root'
})
export class UserPetsService {

  constructor(private http: HttpClient, private router: Router) { }

  // getPetData(user:User): Observable<Pet> {
  //   return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/1/`).subscribe(data => {
  //     let petData = data['pets'];
  //     petData.forEach((pet) => {
  //       let petIdIndex = pet.indexOf(" - ");
  //       let petId = Number(pet.substring(0, petIdIndex));
  //       let petName = pet.substring(petIdIndex+3);
  //       // this.petList.push([petId, petName]);
  //     });
  // });
  // }
}
