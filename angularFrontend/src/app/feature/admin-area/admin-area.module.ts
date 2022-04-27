import { AdminAreaComponent } from './admin-area.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostingAnalysisComponent } from './hosting-analysis/hosting-analysis.component';
import { AdminGuard } from 'src/app/core/auth/admin.guard';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ServicesComponent } from './services/services.component';
import { ChatComponent } from 'src/app/shared/components/chat/chat.component';

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
        path: 'hosting/:id',
        canLoad: [AdminGuard],
        loadChildren: () => import('src/app/shared/components/chat/chat.module').then(m => m.ChatModule),
      }
    ]
  }
]

@NgModule({
  declarations: [AdminAreaComponent, HostingAnalysisComponent, HomeAdminComponent, ServicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AdminAreaModule { }

