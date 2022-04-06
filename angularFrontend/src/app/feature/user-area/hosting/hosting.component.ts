import { HostingService } from '../../../core/services/hosting.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { LoginService } from 'src/app/core/services/login.service';
import { UserPetsService } from 'src/app/core/services/user-pets.service';
import { Pet } from 'src/app/shared/models/pet';


@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  petList: Pet[];

  dayCost:number = 50;

  formHosting: FormGroup = new FormGroup({
    owner: new FormControl('', [Validators.required]),
    pet: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    observations: new FormControl('', [Validators.required]),
    approved: new FormControl('', [Validators.required]),
  })

  user: User;

  constructor(
    private readonly hostingService: HostingService,
    private readonly router: Router,
    private http: HttpClient,
    private readonly loginService: LoginService,
    private readonly userPetsService: UserPetsService,
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.getPetData();
    this.setFormValues();
  }

  setFormValues() {
    this.formHosting.controls['approved'].setValue(false);
    this.formHosting.controls['owner'].setValue(this.user.id);
  }

  getPetData() {
    this.userPetsService.getPetData(this.user).subscribe({
      next: (petList) => {
        this.petList = petList;
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  setCost() {
    if (this.checkDate() && this.formHosting.controls['pet'].valid) {
      let currentPet:Pet;
      this.petList.forEach(pet => {
        if (pet.id == this.formHosting.controls['pet'].value) {
          currentPet = pet;
        }
      });
      this.formHosting.controls['cost'].setValue((currentPet.weight + this.dayCost) * this.checkDate());
      return `R$ ${(currentPet.weight + this.dayCost) * this.checkDate()},00`;
    }
    return ""
  }

  makeHosting() {
    if (this.formHosting.valid) {
      let hosting = Object.assign({}, this.formHosting.value);

      this.hostingService.sendHosting(hosting).subscribe({
        next: () => {
          console.log("Deu bom");
          this.redirect();
        },
        error: (error) => {
          console.log("Erro ao agendar", error)
        }
      }
      )
    }
  }

  checkDate() {
    let startDate:Date;
    let endDate:Date;
    if (this.formHosting.controls['start_date'].valid && this.formHosting.controls['end_date'].valid) {
      let start = (this.formHosting.controls['start_date'].value);
      let end = (this.formHosting.controls['end_date'].value);
      let startDate_str = [start.substring(0, 2), '-', start.substring(2, 4), '-', start.substring(4)].reverse();
      let endDate_str = [end.substring(0, 2), '-', end.substring(2, 4), '-', end.substring(4)].reverse();
      startDate = new Date(startDate_str.join(''));
      endDate = new Date(endDate_str.join(''));

      if (startDate > endDate) {
        alert("A data do Check-out deve ser maior que a do check-in");
        this.formHosting.controls['start_date'].setValue(null);
        this.formHosting.controls['end_date'].setValue(null);
        return null;
      }
      return (endDate.getDate() - startDate.getDate());
    }
    return null;
  }



  redirect() {
    this.router.navigate(['/home']);
  }
}
