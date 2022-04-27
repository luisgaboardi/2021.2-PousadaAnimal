import { UserAreaComponent } from './user-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetRegisterComponent } from './pet-register/pet-register.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { HostingMonitoringComponent } from './hosting-monitoring/hosting-monitoring.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent,
    children:[
      // {path: '', redirectTo: 'cadastro-pet', pathMatch: 'full'},
      {
        path: 'cadastro-pet',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        loadChildren: () => import('./pet-register/pet-register.module').then(m => m.PetRegisterModule),
      },
      {
        path: 'home-user',
        canLoad: [AuthGuard],
        loadChildren: () => import('./home-user/home-user.module').then(m => m.HomeUserModule),
      },
      {
        path: 'hosting',
        canLoad: [AuthGuard],
        loadChildren: () => import('./hosting/hosting.module').then(m => m.HostingModule),
      },
      {
        path: 'hosting/:id',
        canLoad: [AuthGuard],
        loadChildren: () => import('src/app/shared/components/chat/chat.module').then(m => m.ChatModule),
        //component: HostingMonitoringComponent,
      },
      {
        path: 'payment',
        canLoad: [AuthGuard],
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
      }
    ]
  }
]

@NgModule({

  declarations: [UserAreaComponent, PetRegisterComponent, HomeUserComponent, HostingMonitoringComponent, PaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserAreaModule { }
