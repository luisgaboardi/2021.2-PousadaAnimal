import { Hosting } from './../../../shared/models/hosting';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { Register } from 'src/app/core/services/service-register.service';
import { GetRegisterServices } from 'src/app/shared/models/register-service';
import { HostingService } from 'src/app/core/services/hosting.service';

@Component({
  selector: 'app-pet-service',
  templateUrl: './pet-service.component.html',
  styleUrls: ['./pet-service.component.css']
})
export class PetServiceComponent implements OnInit {

  isTextField!: boolean;
  id: number;
  user: User;
  hosting: any;

  formServiceRegister: FormGroup = new FormGroup ({
    cost: new FormControl('',[Validators.required]),
    chosen: new FormControl('',[Validators.required]),
    hosting: new FormControl(null),
  });

  servicesList: GetRegisterServices[] = [];
  hostingList: Hosting[] | any[];

  constructor(
    private readonly serviceRegister: Register,
    private readonly router : Router,
    private readonly AlertModalService: ModalService,
    private route: ActivatedRoute,
    public readonly PetService: HostingService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getServiceList()
  }

  getServiceList(){
    this.serviceRegister.getServices().subscribe({
      next: (servicesList) => {
        this.servicesList = servicesList;
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao listar", error)
      }
    })
  }

  save(){
    this.formServiceRegister.value.hosting = this.id;
    if(this.formServiceRegister.value.chosen) {
      let register = Object.assign({}, this.formServiceRegister.value);
      this.PetService.putService(register, this.id).subscribe({
        next: () => {
          this.handleSucess()
        },
        error: (error) => {
          this.handleError();
          console.log("Erro2!", error)
        }
      })
    }
  }

  approveServices(hosting: Hosting) {
    let sendHosting: Hosting = { ...hosting};
    sendHosting.approved = true;
    sendHosting.employee = hosting.employee;
    sendHosting.owner = hosting.owner["id"] as string;
    sendHosting.pet = hosting.pet["id"] as string;
    this.PetService.editHosting(sendHosting).subscribe({
      error: (error) => {
        sendHosting.approved = false;
        console.log("Erro ao aprovar serviços", error)
      }
    })
  }

  chooseService(service: GetRegisterServices){
    service.chosen = true;
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao escolher serviços. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Concluído!');
  }

  redirect() {
    this.router.navigate(['/user-area/home-user']);
  }

}
