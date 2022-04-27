import { ModalService } from 'src/app/core/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { PetResgisterService } from 'src/app/core/services/pet-register.service';
import { User } from 'src/app/shared/models/user';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['./pet-register.component.css']
})
export class PetRegisterComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  isTextField!: boolean;
  user: User;

  speciesList = ['Cachorro', 'Gato', 'Pássaro'];

  genderList = ['Macho', 'Fêmea'];

  temperamentList = ['Calmo', 'Ansioso', 'Nervoso'];

  sizeList = ['Pequeno', 'Médio', 'Grande'];

  formPetRegister: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    species: new FormControl('', [Validators.required]),
    breed: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    colour: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    medicalConditions: new FormControl(''),
    temperament: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required]),
    is_hosted: new FormControl('', [Validators.required])
  })



  constructor(
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
  }

  registerPet() {
    console.log("Fazer cadastro de pet")
    if (this.formPetRegister.valid) {
      this.blockUI.start();
      let registerpet = Object.assign({}, this.formPetRegister.value);
      this.petService.sendRegisterPet(registerpet).subscribe({
        next: () => {
          console.log("Deu bom");
          this.blockUI.stop();
          this.handleSucess();
          this.redirect();
        },
        error: (error) => {
          this.blockUI.stop();
          this.handleError();
          console.log("Erro ao cadastrar", error)
        }
      })
    }
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao cadastrar o pet. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Cadastro concluído!');
  }

  redirect() {
    this.router.navigate(['/user-area/home-user']);
  }
}
