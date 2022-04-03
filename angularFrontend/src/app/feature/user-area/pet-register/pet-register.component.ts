import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { PetResgisterService } from 'src/app/core/services/pet-register.service';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['./pet-register.component.css']
})
export class PetRegisterComponent implements OnInit {

  isTextField!: boolean;

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

  user: User;

  constructor(
    private readonly router: Router,
    private readonly petService: PetResgisterService,
    private readonly loginService: LoginService
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
      let registerpet = Object.assign({}, this.formPetRegister.value);
      this.petService.sendRegisterPet(registerpet).subscribe({
        next: () => {
          console.log("Deu bom");
          this.redirect();
        },
        error: (error) => {
          console.log("Erro ao cadastrar", error)
        }
      })
    }
  }

  redirect() {
    this.router.navigate(['/user-area/home']);
  }
}