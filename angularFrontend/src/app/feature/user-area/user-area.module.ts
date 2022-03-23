import { UserAreaComponent } from './user-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent,
    children:[
      // {path: '', redirectTo: 'cadastro-pet', pathMatch: 'full'},
      {
        path: 'cadastro-pet',
        loadChildren: () => import('./pet-register/pet-register.module').then(m => m.PetRegisterModule),
      }
    ]
  }
]

@NgModule({
  declarations: [UserAreaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserAreaModule { }
