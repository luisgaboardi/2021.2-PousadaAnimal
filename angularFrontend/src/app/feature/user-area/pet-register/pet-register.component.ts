import { ModalService } from 'src/app/core/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { PetResgisterService } from 'src/app/core/services/pet-register.service';
import { User } from 'src/app/shared/models/user';
import { RegisterHosting } from 'src/app/shared/models/register-hosting';
import { RegisterHost } from 'src/app/core/services/hosting-register';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['./pet-register.component.css']
})
export class PetRegisterComponent implements OnInit {

  isTextField!: boolean;
  user: User;

  genderList = ['Macho', 'Fêmea'];

  temperamentList = ['Calmo', 'Ansioso', 'Nervoso'];

  HostingList: RegisterHosting[] = [];

  formPetRegister: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    breed: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    colour: new FormControl('', [Validators.required]),
    host: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    medicalConditions: new FormControl(''),
    temperament: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required]),
    is_hosted: new FormControl('', [Validators.required])
  })



  constructor(
    private readonly hostingRegister: RegisterHost,
    private readonly router: Router,
    private readonly petService: PetResgisterService,
    private readonly loginService: LoginService,
    private readonly AlertModalService: ModalService
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.formPetRegister.controls['owner'].setValue(this.user.id);
    this.formPetRegister.controls['is_hosted'].setValue(false);
    this.getRegisterHosting()
  }

  registerPet() {
    console.log("Fazer cadastro de pet")
    if (this.formPetRegister.valid) {
      let registerpet = Object.assign({}, this.formPetRegister.value);
      this.petService.sendRegisterPet(registerpet).subscribe({
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

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao cadastrar o pet. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Cadastro concluído!');
  }

  redirect() {
    this.router.navigate(['/user-area/home']);
  }
}
