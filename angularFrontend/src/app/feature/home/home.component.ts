import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: LoginService) {
    this.authenticationService.user.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
  }

}
