import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPet } from 'src/app/shared/models/register-pet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetResgisterService {

  constructor(private readonly http: HttpClient) { }

  sendRegisterPet( newPet: RegisterPet): Observable<RegisterPet>{
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/pets/`, newPet
    )
  }
}
