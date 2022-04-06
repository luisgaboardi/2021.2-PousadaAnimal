import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { GetHosting } from 'src/shared/models/hosting';
import { Pet } from 'src/shared/models/pet';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-hosting-analysis',
  templateUrl: './hosting-analysis.component.html',
  styleUrls: ['./hosting-analysis.component.css']
})
export class HostingAnalysisComponent implements OnInit {

  user: User;

  owner: User;
  hostingList: GetHosting[];

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
      next: (hostingList) => {
        this.hostingList = hostingList as GetHosting[];
        for (let hosting of this.hostingList) {
          this.getOwner(hosting);
          this.getPet(hosting);
        }
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
      }
    }
    )
  }

  getOwner(hosting: GetHosting) {
    return this.hostingService.getOwner(hosting).subscribe({
      next: (owner) => {
        hosting.owner = owner as User;
      },
      error: (error) => {
        console.log("Erro ao pegar dono do pet", error)
      }
    }
    )
  }

  getPet(hosting: GetHosting) {
    return this.hostingService.getPet(hosting).subscribe({
      next: (pet) => {
        hosting.pet = pet as Pet;
      },
      error: (error) => {
        console.log("Erro ao pegar o pet", error)
      }
    }
    )
  }

  getHostingStatus(hosting: GetHosting) {
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

  getStatusString(hosting: GetHosting) {
    if (!hosting.approved) {
      return "Esperando aprovação";
    }
    return "Confirmado";
  }

  cancelHosting(hosting: GetHosting) {
    hosting.approved = false;
    this.hostingService.approveHosting(hosting).subscribe({
      error: (error) => {
        hosting.approved = true;
        console.log("Erro ao cancelar o agendamento", error)
      }
    }
    )
  }

  approveHosting(hosting: GetHosting) {
    hosting.approved = true;
    this.hostingService.approveHosting(hosting).subscribe({
      error: (error) => {
        hosting.approved = false;
        console.log("Erro ao aprovar o agendamento", error)
      }
    }
    )
  }

  formatDate(dateString):string {
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
