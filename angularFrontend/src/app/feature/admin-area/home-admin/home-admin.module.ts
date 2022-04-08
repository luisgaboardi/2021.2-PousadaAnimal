import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { HomeAdminComponent } from './home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeAdminModule { }