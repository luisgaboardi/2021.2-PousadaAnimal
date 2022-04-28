import { environment } from './../../../environments/environment';
import { RegisterHosting} from 'src/app/shared/models/register-hosting';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterHost {

  constructor(private readonly http: HttpClient) { }

  sendRegisterHosting(newHosting: RegisterHosting): Observable<RegisterHosting> {
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/host/`, newHosting
    )
  }

  getHosts(): Observable<RegisterHosting[]> {
    return this.http.get<any>(
      `${environment.endPointPousadaAnimal}/host/`
      )
  }

  deleteHost(getHost: RegisterHosting): Observable<RegisterHosting[]> {
    return this.http.delete<any>(
      `${environment.endPointPousadaAnimal}/host/${getHost.id}/`,
      )
  }
}
