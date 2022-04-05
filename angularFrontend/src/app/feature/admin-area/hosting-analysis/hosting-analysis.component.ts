import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HostingService } from 'src/app/core/services/hosting.service';
import { LoginService } from 'src/app/core/services/login.service';
import { GetHosting } from 'src/shared/models/hosting';
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
      },
      error: (error) => {
        console.log("Erro ao agendar", error)
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

  // Hosting details modal
  openHostingModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      scrollable: true,
      centered: true,
      animation: true
    }).result.then((result) => {
      if (result == "approve") {
        console.log("Faz o put pro backend");
      } else if (result == "ignore") {
        console.log("Coloca a hospedagem numa lista de ignorados");
      }
    }, (reason) => {
      console.log("Saindo da visualização");
    });
  }

  hostingDetails(hosting: GetHosting) {
    return JSON.stringify(hosting);
  }

  redirect() {
    this.router.navigate(['/user-area/home']);
  }

}
