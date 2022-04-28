import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterHosting } from 'src/app/shared/models/register-hosting';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { RegisterHost } from 'src/app/core/services/hosting-register';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  sizeList = ['Pequeno', 'Médio', 'Grande'];

  formHostingRegister: FormGroup = new FormGroup ({
    species: new FormControl('',[Validators.required]),
    size: new FormControl('',[Validators.required]),
    cost:  new FormControl('',[Validators.required]),
  });
  
  HostingList: RegisterHosting[] = [];

  constructor(
    private readonly hostingRegister: RegisterHost,
    private readonly router : Router,
    private readonly AlertModalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getRegisterHosting()
  }

  registerHost() {
    console.log("Fazer cadastro de hospedagem")
    if (this.formHostingRegister.valid) {
      let registerhosting = Object.assign({}, this.formHostingRegister.value);
      this.hostingRegister.sendRegisterHosting(registerhosting).subscribe({
        next: () => {
          console.log("Deu bom");
          this.handleSucess();
          this.redirect();
        },
        error: (error) => {
          this.handleError();
          console.log("Erro ao cadastrar", error)
        }
      })
    }
  }

  getRegisterHosting() {
    this.hostingRegister.getHosts().subscribe({
      next: (HostingList) => {
        this.HostingList = HostingList;
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao listar", error)
      }
    })
  }

  deleteHost(host: RegisterHosting) {
    this.hostingRegister.deleteHost(host).subscribe({
      next: () => {
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao deletar", error)
      }
    })
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao cadastrar hospedagem. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Cadastro concluído!');
  }

  redirect() {
    this.router.navigate(['/admin-area/hosting']);
  }
}

