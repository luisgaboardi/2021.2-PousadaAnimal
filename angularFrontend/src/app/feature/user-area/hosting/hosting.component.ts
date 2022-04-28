import { ModalService } from 'src/app/core/services/modal.service';
import { HostingService } from '../../../core/services/hosting.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { LoginService } from 'src/app/core/services/login.service';
import { UserPetsService } from 'src/app/core/services/user-pets.service';
import { Pet } from 'src/app/shared/models/pet';
import { RegisterHost } from 'src/app/core/services/hosting-register';
import { RegisterHosting } from 'src/app/shared/models/register-hosting';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  petList: Pet[];
  hostingList:  RegisterHosting[];
  currentPet : Pet;
  currentHost : RegisterHosting;

  dayCost:number = 50;
  messageError = false;
  id: string;
  step: number = 0;

  formHosting: FormGroup = new FormGroup({
    owner: new FormControl('', [Validators.required]),
    pet: new FormControl('', [Validators.required]),
    employee: new FormControl(''),
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
    private readonly AlertModalService: ModalService,
    private readonly hosting: RegisterHost,
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.getPetData();
    this.setFormValues();
    this.getHostingData();
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

  getHostingData() {
    this.hosting.getHosts().subscribe({
      next: (hostingList) => {
        this.hostingList = hostingList;
        console.log("Deu bom");
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  setCost() {
    let dayCost : number;
    if (this.formHosting.controls['pet'].valid) {
      this.petList.forEach(pet => {
        if (pet.id == this.formHosting.controls['pet'].value) {
          this.currentPet = pet;
          dayCost = this.getHosting(pet.host);
        }
      });
      this.formHosting.controls['cost'].setValue(dayCost * this.checkDate());
      return `R$ ${dayCost * this.checkDate()},00`;
    }
    return ""
  }

  getHosting(id) {
    this.hostingList.forEach(host => {
      if (host.id == id) {
        this.currentHost = host;
      }
    });
    console.log(this.currentHost.cost);
    return this.currentHost.cost;
  }

  makeHosting() {
    if (this.formHosting.valid) {
      let hosting = Object.assign({}, this.formHosting.value);
      this.hostingService.sendHosting(hosting).subscribe({
        next: (data) => {
          this.id = data.id;
          this.handleSucess();
          console.log("Deu bom");
          this.step = 1;
        },
        error: (error) => {
          this.handleError();
          console.log("Erro ao agendar", error)
        }
      }
      )
    }
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao agendar. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Agendamento concluído!');
  }


  redirect() {
    this.router.navigate(['/user-area/home-user']);
  }

  checkDate() {
    const day = 24 * 60 * 60 * 1000;
    let startDate:Date;
    let endDate:Date;
    if (this.formHosting.controls['start_date'].valid && this.formHosting.controls['end_date'].valid) {
      let start = (this.formHosting.controls['start_date'].value);
      let end = (this.formHosting.controls['end_date'].value);
      let startDate_str = [start.substring(0, 2), '-', start.substring(2, 4), '-', start.substring(4)].reverse();
      let endDate_str = [end.substring(0, 2), '-', end.substring(2, 4), '-', end.substring(4)].reverse();
      startDate = new Date(startDate_str.join(''));
      endDate = new Date(endDate_str.join(''));

      let m1 = startDate.getTime();
      let m2 = endDate.getTime();
      let result = m2 - m1;
      let dias = result/ day;
      let myDate = new Date();
      let dateyear = myDate.getTime();
      let yearStart = (m1 - dateyear)/day;
      let yearEnd = (m2 - dateyear)/day;

      if((yearStart || yearEnd)>365){
        alert('As datas não podem ser de mais de um ano');
        this.formHosting.controls['start_date'].setValue(null);
        this.formHosting.controls['end_date'].setValue(null);
      }

      if(myDate > (startDate || endDate)){
        alert('As datas devem ser maiores que a de hoje');
        this.formHosting.controls['start_date'].setValue(null);
        this.formHosting.controls['end_date'].setValue(null);
      }

      if (startDate > endDate) {
        alert('A data de entrada deve ser maior que a de saída');
        this.formHosting.controls['start_date'].setValue(null);
        this.formHosting.controls['end_date'].setValue(null);
      }

      return (dias);
    }
    return 0;
  }
}
