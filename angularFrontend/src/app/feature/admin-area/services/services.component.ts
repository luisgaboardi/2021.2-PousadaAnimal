import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { Register } from 'src/app/core/services/service-register.service';
import { GetRegisterServices } from 'src/app/shared/models/register-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  formServiceRegister: FormGroup = new FormGroup ({
    name: new FormControl('',[Validators.required]),
    descrition: new FormControl('',[Validators.required]),
    cost:  new FormControl('',[Validators.required]),
   });

   servicesList: GetRegisterServices[] = [];

   constructor(
    private readonly serviceRegister: Register,
    private readonly router : Router,
    private readonly AlertModalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getRegisterService()
  }

  registerService() {
    console.log("Fazer cadastro de serviço")
    if (this.formServiceRegister.valid) {
      let registerservice = Object.assign({}, this.formServiceRegister.value);
      this.serviceRegister.sendRegisterService(registerservice).subscribe({
        next: () => {
          console.log("Deu bom");
          this.handleSucess();
          window.location.reload();
        },
        error: (error) => {
          this.handleError();
          console.log("Erro ao cadastrar", error)
        }
      })
    }
  }

  getRegisterService() {
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

  deleteService(service: GetRegisterServices) {
    this.serviceRegister.deleteService(service).subscribe({
      next: () => {
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao deletar", error)
      }
    })
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao cadastrar serviço. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Cadastro de Serviço concluído!');
  }

  redirect() {
    this.router.navigate(['/admin-area/services']);
  }
}
