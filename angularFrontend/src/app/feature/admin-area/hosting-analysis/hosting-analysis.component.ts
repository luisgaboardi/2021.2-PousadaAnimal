import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Hosting } from 'src/app/shared/models/hosting';
import { Pet } from 'src/app/shared/models/pet';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-hosting-analysis',
  templateUrl: './hosting-analysis.component.html',
  styleUrls: ['./hosting-analysis.component.css']
})
export class HostingAnalysisComponent implements OnInit {

  user: User;

  owner: User;
  hostingList: Hosting[] | any[];

  constructor(
    private readonly hostingService: HostingService,
    private readonly router: Router,
    private http: HttpClient,
    private readonly loginService: LoginService,
    private modalService: NgbModal
  ) {
    this.user = loginService.GetUser();
  }

  ngOnInit(): void {
    this.getHostingList();
  }

  getHostingList() {
    this.hostingService.getHostings().subscribe({
      next: (hostingList: any) => {
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
    this.hostingService.getOwner(hosting).subscribe({
      next: (user: any) => {
        hosting.owner = user;
      },
      error: (error) => {
        console.log(`Erro ao pegar dono do pet`, error)
      }
    }
    )
    if (hosting.employee != null) {
      this.hostingService.getEmployee(hosting).subscribe({
        next: (user: any) => {
          hosting.employee = user;
        },
        error: (error) => {
          console.log(`Erro ao pegar funcionário responsável do pet`, error)
        }
      }
      )
    }
  }

  getPet(hosting: Hosting) {
    return this.hostingService.getPet(hosting).subscribe({
      next: (pet: any) => {
        hosting.pet = pet as Pet;
      },
      error: (error) => {
        console.log("Erro ao pegar o pet", error)
      }
    }
    )
  }

  getHostingStatus(hosting: Hosting) {
    let today = new Date();
    let hostingStartDate = new Date(hosting.start_date);
    let hostingEndDate = new Date(hosting.end_date);
    if ((!hosting.approved && today > hostingStartDate) || (hosting.approved && today > hostingEndDate)) {
      return "Passado";
    } else if (!hosting.approved && today <= hostingStartDate) {
      return "Pendente"
    } else {
      return "Confirmado";
    }

  }

  getStatusString(hosting: Hosting) {
    if (!hosting.approved) {
      return "Esperando aprovação";
    }
    return "Confirmado";
  }

  cancelHosting(hosting: Hosting) {
    let sendHosting: Hosting = { ...hosting };
    sendHosting.approved = false;
    sendHosting.employee = this.user.id;
    sendHosting.owner = hosting.owner["id"] as string;
    sendHosting.pet = hosting.pet["id"] as string;
    this.hostingService.editHosting(sendHosting).subscribe({
      error: (error) => {
        sendHosting.approved = true;
        console.log("Erro ao cancelar o agendamento", error)
      }
    }
    )
    hosting.approved = false;
    window.location.reload();
  }

  approveHosting(hosting: Hosting) {
    let sendHosting: Hosting = { ...hosting };
    sendHosting.approved = true;
    sendHosting.employee = this.user.id;
    sendHosting.owner = hosting.owner["id"] as string;
    sendHosting.pet = hosting.pet["id"] as string;
    this.hostingService.editHosting(sendHosting).subscribe({
      error: (error) => {
        sendHosting.approved = false;
        console.log("Erro ao aprovar o agendamento", error)
      }
    }
    )
    hosting.approved = true;
    window.location.reload();
  }

  formatDate(dateString): string {
    let dArr = dateString.trim().split("-");  // ex input "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
  }

  // Hosting details modal
  openHostingModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true,
      centered: true,
      animation: true
    })
  }

  redirect() {
    this.router.navigate(['/user-area/hosting-analysis']);
  }

}
