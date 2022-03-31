import { UserAreaComponent } from './user-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetRegisterComponent } from './pet-register/pet-register.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent,
    children:[
      // {path: '', redirectTo: 'cadastro-pet', pathMatch: 'full'},
      {
        path: 'cadastro-pet',
        canLoad: [AuthGuard],
        loadChildren: () => import('./pet-register/pet-register.module').then(m => m.PetRegisterModule),
      },
      {
        path: 'home',
        canLoad: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'hosting',
        canLoad: [AuthGuard],
        loadChildren: () => import('./hosting/hosting.module').then(m => m.HostingModule),
      }
    ]
  }
]

@NgModule({
  declarations: [UserAreaComponent, PetRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserAreaModule { }
