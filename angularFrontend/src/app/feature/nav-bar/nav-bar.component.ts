import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  header: number;
  rotaSubscription: Subscription

  constructor(
    public readonly loginService: LoginService,
    public readonly router: Router) {
    this.rotaSubscription = this.router.events.subscribe(() => {
    const rota = this.router.url;
    if(rota.indexOf('user-area')){
      this.header = 1;
    }
   });
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

}
