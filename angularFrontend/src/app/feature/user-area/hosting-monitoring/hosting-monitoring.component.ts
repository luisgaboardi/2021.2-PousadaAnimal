
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  // messageList: Message[];
  newMessage = '';
  id: number;

  messageLi: ['chora', 'chorei'];
  messageList: [
    {
    user: 'Laís',
    content: 'conjunto das palavras escritas, em livro, folheto, documento etc. (p.opos. a comentários, aditamentos, sumário etc.)',
    data: '25/08/2022',
    },
    {
      user: 'FeijÃO',
      content: 'livro, folheto, documento etc.',
      data: '26/08/2022',
    },
  ];

  formMessage: FormGroup = new FormGroup({
    time_sent: new FormControl(''),
    user: new FormControl(null),
    hosting: new FormControl(null),
    content: new FormControl('', [Validators.required]),
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
    console.log("1",this.hosting);
    this.hostingService.getUserHostings(this.user).subscribe({
      next: (hostingList: any) => {
        for (let hosting of hostingList) {
          if (hosting.id == this.id) {
            this.hosting = { ...hosting };
            console.log("hosting", this.hosting);
            break;
          }
        }
        console.log("TESTe", this.hosting);
        this.getUsers(this.hosting);
        this.getPet(this.hosting);
        this.getHostingMessages();
        console.log("TEte", this.hosting);
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
    console.log("2",this.hosting);
  }

  getUsers(hosting: Hosting) {
    console.log("3",this.hosting);
    this.hostingService.getOwner(hosting).subscribe({
      next: (user: any) => {
        hosting.owner = user;
        console.log("Sucesso user", this.hosting);
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
          console.log("Sucesso employee", this.hosting);
        },
        error: (error) => {
          console.log(`Erro ao pegar funcionário responsável do pet`, error)
        }
      }
      )
    }
    console.log("4",this.hosting);
  }

  getPet(hosting: Hosting) {
    console.log("5",this.hosting);
    this.hostingService.getPet(hosting).subscribe({
      next: (pet: any) => {
        hosting.pet = pet as Pet;
        console.log("Sucesso pet", this.hosting);
      },
      error: (error) => {
        console.log("Erro ao pegar o pet", error)
      }
    }
    )
    console.log("6",this.hosting);
  }

  getHostingMessages() {
    console.log("7",this.hosting);
    this.hostingService.getHostingMessages(this.hosting).subscribe({
      next: (messageList: any) => {
        this.messageList = messageList;
        console.log("messages get",this.messageList);
      },
      error: (error) => {
        console.log("Erro ao carregar as mensagens", error)
      }
    })
  }

  sendMessage(){
    this.formMessage.value.id= this.hosting.id;
    this.formMessage.value.time_sent = new Date;
    this.formMessage.value.user= this.user;
    this.formMessage.value.Hosting= this.hosting;
    console.log("tu",this.formMessage.value.Hosting);

    if(this.formMessage.valid){
      let messageSubmit = Object.assign({}, this.formMessage.value);

      this.hostingService.sendHostingMessages(messageSubmit).subscribe({
        next: (data: any) =>{
          this.messageList = data;
          console.log("messages send",this.messageList);
        },
        error: (error) =>{
          console.log("Erro ao enviar", error);
        }
      })
    }
  }

}
