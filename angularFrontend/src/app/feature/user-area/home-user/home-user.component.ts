import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/models/user'; //verificar
import { Pet } from 'src/app/shared/models/pet'; //verificar
import { UserPetsService } from 'src/app/core/services/user-pets.service';


@Component({
  selector: 'app-home',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  petList: Pet[];
  user: User;

  formHome: FormGroup = new FormGroup ({
    icon: new FormControl(''),
    banner: new FormControl(''),
    pet: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly loginService: LoginService,
    private readonly userPetsService: UserPetsService,
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {

    this.getPetData();
  }

  getPetData() {
    this.userPetsService.getPetData(this.user).subscribe({
      next: (petList) => {
        this.petList = petList;
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao listar", error)
      }
    })
  }

}
