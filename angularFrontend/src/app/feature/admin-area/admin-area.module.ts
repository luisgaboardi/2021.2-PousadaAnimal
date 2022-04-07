

import { AdminAreaComponent } from './admin-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostingAnalysisComponent } from './hosting-analysis/hosting-analysis.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';

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
      }
    ]
  }
]

@NgModule({
  declarations: [AdminAreaComponent, HostingAnalysisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AdminAreaModule { }

