import { environment } from './../../../environments/environment';
import { Hosting } from 'src/app/shared/models/hosting';
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

}

