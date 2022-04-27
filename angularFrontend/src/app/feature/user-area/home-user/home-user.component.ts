import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/models/user';
import { Pet } from 'src/app/shared/models/pet';
import { UserPetsService } from 'src/app/core/services/user-pets.service';
import { HostingService } from 'src/app/core/services/hosting.service';
import { Hosting } from 'src/app/shared/models/hosting';

@Component({
  selector: 'app-home',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  petList: Pet[] | any[] = [];
  hostingList: Hosting[] | any[] = [];
  user: User;

  formHome: FormGroup = new FormGroup({
    icon: new FormControl(''),
    banner: new FormControl(''),
    pet: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly loginService: LoginService,
    private readonly userPetsService: UserPetsService,
    private readonly hostingService: HostingService,
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.getPetData();
    this.getHostingList();
  }

  getPetData() {
    this.userPetsService.getPetData(this.user).subscribe({
      next: (petList) => {
        this.petList = petList;
      },
      error: (error) => {
        console.log("Erro ao listar", error)
      }
    })
  }

  getHostingList() {
    this.hostingService.getUserHostings(this.user).subscribe({
      next: (hostingList) => {
        this.hostingList = hostingList as Hosting[];
        for (let hosting of this.hostingList) {
          this.getUsers(hosting);
          this.getPet(hosting);
        }
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  getUsers(hosting: Hosting) {
    this.blockUI.start();
    this.hostingService.getOwner(hosting).subscribe({
      next: (user) => {
        this.blockUI.stop();
        hosting.owner = user;
      },
      error: (error) => {
        this.blockUI.stop();
        console.log(`Erro ao pegar dono do pet`, error)
      }
    }
    )

    if (hosting.employee != null) {
      this.blockUI.start();
      this.hostingService.getEmployee(hosting).subscribe({
        next: (user) => {
          this.blockUI.stop();
          hosting.employee = user;
        },
        error: (error) => {
          this.blockUI.stop();
          console.log(`Erro ao pegar funcionário responsável do pet`, error)
        }
      }
      )
    }

  }

  getStatusString(hosting: Hosting) {
    if (!hosting.approved) {
      return "Esperando aprovação";
    }
    return "Confirmado";
  }

  formatDate(dateString: string): string {
    let dArr = dateString.trim().split("-");  // ex input "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
  }

  getPet(hosting: Hosting) {
    this.blockUI.start();
    return this.hostingService.getPet(hosting).subscribe({
      next: (pet) => {
        this.blockUI.stop();
        hosting.pet = pet as Pet;
      },
      error: (error) => {
        this.blockUI.stop();
        console.log("Erro ao pegar o pet", error)
      }
    }
    )
  }

}
