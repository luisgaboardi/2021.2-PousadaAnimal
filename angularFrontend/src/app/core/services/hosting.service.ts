import { environment } from './../../../environments/environment';
import { GetHosting, Hosting } from '../../../shared/models/hosting';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';
import { Pet } from 'src/shared/models/pet';

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

  approveHosting(getHosting: GetHosting): Observable<Hosting> {
    let hosting:Hosting = {
      owner: parseInt(getHosting.owner.id),
      pet: parseInt(getHosting.pet.id),
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

  getPet(hosting: GetHosting): Observable<Pet> {
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/pets/${hosting.pet}`)
  }

}

