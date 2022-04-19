import { environment } from './../../../environments/environment';
import { RegisterService, GetRegisterServices } from 'src/app/shared/models/register-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Register {

  constructor(private readonly http: HttpClient) { }

  sendRegisterService(newService: RegisterService): Observable<RegisterService> {
    return this.http.post<any>(
      `${environment.endPointPousadaAnimal}/services/`, newService
    )
  }

  getServices(): Observable<GetRegisterServices[]> {
    return this.http.get<any>(
      `${environment.endPointPousadaAnimal}/services/`
      )
  }

  deleteService(getService: GetRegisterServices): Observable<GetRegisterServices[]> {
    return this.http.delete<any>(
      `${environment.endPointPousadaAnimal}/services/${getService.id}/`,
      )
  }
}
