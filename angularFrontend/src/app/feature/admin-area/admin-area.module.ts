

import { AdminAreaComponent } from './admin-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostingAnalysisComponent } from './hosting-analysis/hosting-analysis.component';
import { AdminGuard } from 'src/app/core/auth/admin.guard';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAreaComponent,
    children:[
      // {path: '', redirectTo: 'cadastro-pet', pathMatch: 'full'},
      {
        path: 'hosting-analysis',
        canLoad: [AdminGuard],
        loadChildren: () => import('./hosting-analysis/hosting-analysis.module').then(m => m.HostingAnalysisModule),
      },
      {
        path: 'home',
        canLoad: [AdminGuard],
        loadChildren: () => import('./home-admin/home-admin.module').then(m => m.HomeAdminModule),
      },
    ]
  }
]

@NgModule({
  declarations: [AdminAreaComponent, HostingAnalysisComponent, HomeAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AdminAreaModule { }

