import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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