import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class PaymentModule { }
