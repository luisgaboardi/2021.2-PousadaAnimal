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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

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
  }

  getHosting() {
    if (this.user.staff) {
      this.hostingService.getHostings().subscribe({
        next: (hostingList: any) => {
          for (let hosting of hostingList) {
            if (hosting.id == this.id) {
              this.hosting = { ...hosting };
              this.getUsers(this.hosting);
              this.getPet(this.hosting);
              this.getHostingMessages(this.hosting);
              break;
            }
          }
        },
        error: (error) => {
          console.log("Erro ao agendar", error)
        }
      }
      )
    }
    this.hostingService.getUserHostings(this.user).subscribe({
      next: (hostingList: any) => {
        for (let hosting of hostingList) {
          if (hosting.id == this.id) {
            this.hosting = { ...hosting };
            this.getUsers(this.hosting);
            this.getPet(this.hosting);
            this.getHostingMessages(this.hosting);
            break;
          }
        }
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  getUsers(hosting: Hosting) {
    this.hostingService.getOwner(hosting).subscribe({
      next: (user: User) => {
        hosting.owner = user as User;
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

  getHostingMessages(hosting: Hosting) {
    this.hostingService.getHostingMessages(hosting).subscribe({
      next: (messageList: Message[]) => {
        this.messageList = [...messageList];
        for (let message of this.messageList) {
          this.hostingService.getUserFromId(message.user).subscribe({
            next: (user: User) => {
              message.user = user;
            },
            error: (error) => {
              console.log(`Erro ao pegar remetente da mensagem`, error)
            }
          }
          )
        }
      },
      error: (error) => {
        console.log("Erro ao carregar as mensagens", error)
      }
    })
  }
}
