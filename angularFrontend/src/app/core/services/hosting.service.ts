import { environment } from './../../../environments/environment';
import { GetHosting, Hosting } from 'src/app/shared/models/hosting'; //verificar
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

  getHostings(): Observable<GetHosting[]> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/hosting/`)
  }

  editHosting(getHosting: GetHosting): Observable<Hosting> {
    let hosting:Hosting = {
      owner: Number(getHosting.owner.id),
      employee: Number(getHosting.employee.id),
      pet: Number(getHosting.pet.id),
      start_date: getHosting.start_date,
      end_date: getHosting.end_date,
      cost: getHosting.cost,
      observations: getHosting.observations,
      approved: getHosting.approved
    }
    return this.http.put<any>(
      `${environment.endPointPousadaAnimal}/hosting/${getHosting.id}/`, hosting
    )
  }

  getOwner(hosting: GetHosting): Observable<User> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${hosting.owner}`)
  }

  getEmployee(hosting: GetHosting): Observable<User> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/users/${hosting.employee}`)
  }

  getPet(hosting: GetHosting): Observable<Pet> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/pets/${hosting.pet}`)
  }

}

