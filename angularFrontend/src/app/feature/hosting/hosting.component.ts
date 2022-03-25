import { HostingService } from './../../core/services/hosting.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  formHosting: FormGroup = new FormGroup({
    owner: new FormControl('', [Validators.required]),
    pet: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    observations: new FormControl('', [Validators.required]),
    approved: new FormControl('', [Validators.required]),
  })

  constructor(
    private readonly hostingService: HostingService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.formHosting.controls['approved'].setValue(false);
    this.formHosting.controls['owner'].setValue(1); // Pegar a partir da autenticação

    this.formHosting.controls['cost'].setValue(250); // Mudar dinamicamente
  }

  makeHosting() {
    if (this.formHosting.valid) {
      let hosting = Object.assign({}, this.formHosting.value);

      this.hostingService.sendHosting(hosting).subscribe({
        next: () => { // definir data
          this.redirect();
        },
        error: (error) => {
          console.log("Erro ao agendar", error) //definir tipos de erros
        }
      }
      )
    }
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
