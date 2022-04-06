import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({
  providedIn:'root',
})
export class AdminGuard implements CanLoad, CanActivate{

  constructor(
    private readonly router: Router,
    private readonly auth: LoginService
  ){}


  canLoad(): boolean | Observable<boolean> |Promise<boolean> {
    const token = this.auth.GetToken();
      const user = this.auth.GetUser();
      if(!token || !user.staff ){
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.auth.GetToken();
      const user = this.auth.GetUser();
      if(!token || !user.staff ){
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
  }
}
