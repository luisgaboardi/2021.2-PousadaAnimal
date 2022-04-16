import { environment } from './../../../environments/environment';
import { Hosting } from 'src/app/shared/models/hosting'; //verificar
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Pet } from 'src/app/shared/models/pet';

@Injectable({
  providedIn: 'root'
})
export class HostingService {

  constructor(private readonly http: HttpClient) { }

  sendHosting(newHosting: Hosting): Observable<Hosting> {
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/hosting/`, newHosting
    )
  }

  getHostings(): Observable<Hosting[]> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/hosting/`)
  }

  getUserHostings(user: User): Observable<Hosting[]> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${user.id}/hostings`)
  }

  editHosting(hosting: Hosting): Observable<Hosting> {
    return this.http.put<any>(
      `${environment.endPointPousadaAnimal}/hosting/${hosting.id}/`, hosting
    )
  }

  getOwner(hosting: Hosting): Observable<User> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${hosting.owner}`)
  }

  getEmployee(hosting: Hosting): Observable<User> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${hosting.employee}`)
  }

  getPet(hosting: Hosting): Observable<Pet> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/pets/${hosting.pet}`)
  }

}

