import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { GetHosting } from 'src/shared/models/hosting.model';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-hosting-analysis',
  templateUrl: './hosting-analysis.component.html',
  styleUrls: ['./hosting-analysis.component.css']
})
export class HostingAnalysisComponent implements OnInit {

  user: User;

  owner: User;
  hostingList: GetHosting[];

  constructor(
    private readonly hostingService: HostingService,
    private readonly router: Router,
    private http: HttpClient,
    private readonly loginService: LoginService,
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.getHostingList();
  }

  getHostingList() {
    this.hostingService.getHostings().subscribe({
      next: (hostingList) => {
        this.hostingList = hostingList;
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  approveHosting() {
    return JSON.stringify(this.hostingList);
  }

}
