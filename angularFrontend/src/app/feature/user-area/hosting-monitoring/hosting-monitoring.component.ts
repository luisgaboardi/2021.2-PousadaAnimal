import { HashLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Hosting } from 'src/app/shared/models/hosting';
import { Message } from 'src/app/shared/models/message';
import { Pet } from 'src/app/shared/models/pet';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-hosting-monitoring',
  templateUrl: './hosting-monitoring.component.html',
  styleUrls: ['./hosting-monitoring.component.css']
})
export class HostingMonitoringComponent implements OnInit {

  user: User;
  hosting: Hosting;
  messageList: Message[];
  id: number;

  constructor(
    private readonly hostingService: HostingService,
    private readonly router: Router,
    private http: HttpClient,
    private readonly loginService: LoginService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getHosting();
    this.getHostingMessages();
  }

  getHosting() {
    this.hostingService.getUserHostings(this.user).subscribe({
      next: (hostingList: any) => {
        for (let hosting of hostingList) {
          if (hosting.id == this.id) {
            this.hosting = { ...hosting };
            break;
          }
        }
        this.getUsers(this.hosting);
        this.getPet(this.hosting);
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  getUsers(hosting: Hosting) {
    this.hostingService.getOwner(hosting).subscribe({
      next: (user: any) => {
        hosting.owner = user;
      },
      error: (error) => {
        console.log(`Erro ao pegar dono do pet`, error)
      }
    }
    )
    if (hosting.employee != null) {
      this.hostingService.getEmployee(hosting).subscribe({
        next: (user: any) => {
          hosting.employee = user;
        },
        error: (error) => {
          console.log(`Erro ao pegar funcionário responsável do pet`, error)
        }
      }
      )
    }
  }

  getPet(hosting: Hosting) {
    return this.hostingService.getPet(hosting).subscribe({
      next: (pet: any) => {
        hosting.pet = pet as Pet;
      },
      error: (error) => {
        console.log("Erro ao pegar o pet", error)
      }
    }
    )
  }

  getHostingMessages() {
    this.hostingService.getHostingMessages(this.hosting).subscribe({
      next: (messageList: any) => {
        console.log(messageList);
        this.messageList = messageList;
      },
      error: (error) => {
        console.log("Erro ao carregar as mensagens", error)
      }
    })
  }
}
