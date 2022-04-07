

import { AdminAreaComponent } from './admin-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostingAnalysisComponent } from './hosting-analysis/hosting-analysis.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAreaComponent,
    children:[
      // {path: '', redirectTo: 'cadastro-pet', pathMatch: 'full'},
      {
        path: 'hosting-analysis',
        canLoad: [AuthGuard],
        loadChildren: () => import('./hosting-analysis/hosting-analysis.module').then(m => m.HostingAnalysisModule),
      },
      {
        path: 'home',
        canLoad: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      }
    ]
  }
]

@NgModule({
  declarations: [AdminAreaComponent, HostingAnalysisComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AdminAreaModule { }

