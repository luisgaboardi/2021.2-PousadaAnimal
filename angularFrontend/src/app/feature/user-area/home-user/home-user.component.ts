import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  user: User;

  constructor(loginService:LoginService) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    
  }

}
