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
    namePayment: new FormControl('', Validators.required),
    hosting: new FormControl(null),
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
  pix(){
    if(this.formPay.value.namePayment == "pix"){
      return true;
    }
    return false;
  }

  transfer(){
    if(this.formPay.value.namePayment == "transfer"){
      return true;
    }
    return false;
  }
  other(){
    if(this.formPay.value.namePayment == "debit" || this.formPay.value.namePayment == "credit" ){
      return true;
    }
    return false;
  }

  save(){
    this.formPay.value.hosting = this.id;
    console.log(this.id);
    if(this.formPay.valid){
      let register = Object.assign({}, this.formPay.value);
      console.log(register);
      this.PaymentService.postPayment(register, this.id).subscribe({
        next: () => {
          this.handleSucess()
        },
        error: (error) =>{
          this.handleError();
          console.log("Erro!", error)
        }
      })
    }
  }
  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao escolher pagamento. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Concluído!');
  }

}
