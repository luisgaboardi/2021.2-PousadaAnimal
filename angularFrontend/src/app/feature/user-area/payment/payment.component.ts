import { HostingService } from 'src/app/core/services/hosting.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // paymentType = [
  //   nome = '',
  // ]
  hosting: any;
  id: number;
  formPay: FormGroup = new FormGroup({
    payment: new FormControl('', Validators.required)
  });
  constructor(
    public readonly PaymentService: HostingService,
    private readonly AlertModalService: ModalService,
    private readonly router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  // getHosting() {
  //     this.PaymentService.getHostings().subscribe({
  //       next: (hostingList: any) => {
  //         for (let hosting of hostingList) {
  //           if (hosting.id == this.id) {
  //             this.hosting = { ...hosting };
  //             break;
  //           }
  //         }
  //       },
  //       error: (error) => {
  //         console.log("Erro", error)
  //       }
  //     }
  //     )
  //   }

  save(){
    if(this.formPay.valid){
      let register = Object.assign({}, this.formPay.value);
      this.PaymentService.postPayment(register, this.hosting).subscribe({

      })
    }
  }
  // validatePayment(){
  //   if(this)
  // }
}
