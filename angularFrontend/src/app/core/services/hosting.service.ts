import { environment } from './../../../environments/environment';
import { GetHosting, Hosting } from './../../../shared/models/hosting.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostingService {

  constructor(private readonly http: HttpClient) { }

  sendHosting( newHosting: Hosting): Observable<Hosting>{
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/hosting/`, newHosting
    )
  }

  getHostings(): Observable<GetHosting[]>{
    return this.http.get<any>(`${environment.endPointPousadaAnimal}/hosting/`)
  }

}

