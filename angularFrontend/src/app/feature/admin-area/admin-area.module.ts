import { AdminAreaComponent } from './admin-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostingAnalysisComponent } from './hosting-analysis/hosting-analysis.component';
import { AdminGuard } from 'src/app/core/auth/admin.guard';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ServicesComponent } from './services/services.component';
import { HostingComponent } from './hosting/hosting.component';

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
        path: 'home-admin',
        canLoad: [AdminGuard],
        loadChildren: () => import('./home-admin/home-admin.module').then(m => m.HomeAdminModule),
      },
      {
        path: 'services',
        canLoad: [AdminGuard],
        loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
      },
      {
        path: 'hosting',
        canLoad: [AdminGuard],
        loadChildren: () => import('./hosting/hosting.module').then(m => m.HostingModule),
      },
    ]
  }
]

@NgModule({
  declarations: [AdminAreaComponent, HostingAnalysisComponent, HomeAdminComponent, ServicesComponent, HostingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AdminAreaModule { }

