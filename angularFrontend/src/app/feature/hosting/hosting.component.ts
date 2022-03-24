import { HostingService } from './../../core/services/hosting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {

  formHosting: FormGroup = new FormGroup ({
    pet: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date: new FormControl('',[Validators.required]),
    cost: new FormControl('',[Validators.required]),
    observation: new FormControl('',[Validators.required]),
    approved: new FormControl('',[Validators.required]),
  })

  constructor(
    private readonly hostingService: HostingService,
    private readonly router : Router
  ) { }

  ngOnInit(): void { }

  makeHosting(){
    if(this.formHosting.valid){
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


  redirect(){
    this.router.navigate(['/home']);
  }
}
