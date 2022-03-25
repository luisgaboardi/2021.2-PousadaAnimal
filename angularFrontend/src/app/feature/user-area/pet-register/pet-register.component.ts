import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetResgisterService } from 'src/app/core/services/pet-register.service';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['./pet-register.component.css']
})
export class PetRegisterComponent implements OnInit {

  isTextField!: boolean;

  speciesList = [
    { name: 'Cachorro' },
    { name: 'Gato' },
    { name: 'Pássaro' }
  ]; // consertar depois para a administração escolher os tipos de animais

  genderList = [
    { name: 'Macho' },
    { name: 'Fêmea' }
  ];

  temperamentList = [
    { name: 'Bonzinho' },
    { name: 'Malvadinho' }
  ];

  sizeList = [
    { name: 'Pequeno' },
    { name: 'Médio' },
    { name: 'Grande' },
  ];

  formPetRegister: FormGroup = new FormGroup ({
    name: new FormControl('',[Validators.required]),
    species: new FormControl ('', [Validators.required]),
    breed: new FormControl('',[Validators.required]),
    gender: new FormControl ('', [Validators.required]),
    colour: new FormControl('',[Validators.required]),
    size: new FormControl ('', [Validators.required]),
    age: new FormControl('',[Validators.required]),
    weight: new FormControl('',[Validators.required]),
    medicalConditions: new FormControl('',[Validators.required]),
    temperament: new FormControl ('', [Validators.required])
  })

  constructor(
    private readonly router : Router,
    private readonly petService: PetResgisterService
  ) { }

  ngOnInit(): void {}

  registerPet(){
    console.log("Fazer cadastro")
    if(this.formPetRegister.valid){
      let registerpet = Object.assign({}, this.formPetRegister.value);
      this.petService.sendRegisterPet(registerpet).subscribe({
        next:() => {
        this.redirect();
        },
        error: (error) => {
          console.log("Erro ao registrar", error) //definir tipos de erros
        }
      })
    }
  }

  redirect(){
    this.router.navigate(['/']);//ver
  }
}
