
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Hosting } from 'src/app/shared/models/hosting';
import { Pet } from 'src/app/shared/models/pet';
import { User } from 'src/app/shared/models/user';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User;
  hosting: Hosting;
  messageList: Message[] = [];
  id: number;

  formMessage: FormGroup = new FormGroup({
    user: new FormControl(null),
    hosting: new FormControl(null),
    content: new FormControl('', [Validators.required]),
    time_sent: new FormControl(''),
  })

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
    this.hostingService.getPet(hosting).subscribe({
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
        this.messageList = messageList.reverse().slice(0, 10);
        for (let message of this.messageList) {
          this.hostingService.getUserFromId(message.user).subscribe({
            next: (user: User) => {
              message.user = user;
              message.time_sent = new Date(message.time_sent).toLocaleString('pt-BR');
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

  sendMessage() {
    let currentDateTime: Date = new Date();
    this.formMessage.value.time_sent = currentDateTime.toISOString();
    this.formMessage.value.user = this.user.id;
    this.formMessage.value.hosting = this.hosting.id;

    if (this.formMessage.valid) {
      let messageSubmit = Object.assign({}, this.formMessage.value);

      this.hostingService.sendHostingMessages(messageSubmit, this.hosting.id).subscribe({
        next: (data: any) => {
          this.messageList = data;
          window.location.reload()
        },
        error: (error) => {
          console.log("Erro ao enviar", error);
        }
      })
    }
  }

  redirect() {

  }

}
