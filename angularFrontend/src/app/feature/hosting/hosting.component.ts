import { HostingService } from './../../core/services/hosting.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  petList: [number, string][] = [];

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
    private readonly router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>(`${environment.endPointPousadaAnimal}/users/1/`).subscribe(data => {
        let petData = data['pets'];
        petData.forEach((pet) => {
          let petIdIndex = pet.indexOf(" - ");
          let petId = Number(pet.substring(0, petIdIndex));
          let petName = pet.substring(petIdIndex+3);
          this.petList.push([petId, petName]);
        }); 
    });
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
