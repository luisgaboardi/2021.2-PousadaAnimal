import { AuthGuard } from 'src/app/core/auth/auth.guard';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/auth/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {
    path: 'auth',
      loadChildren: () =>
        import('./feature/auth/auth.module').then((x) => x.AuthModule)
  },
  {
    path: 'home',
      loadChildren: () =>
        import('./feature/home/home.module').then((x)=> x.HomeModule)
  },
  {
    path: 'user-area',
    canLoad: [AuthGuard],
      loadChildren: () =>
        import('./feature/user-area/user-area.module').then((x)=> x.UserAreaModule)
  },
  {
    path: 'admin-area',
    canLoad: [AdminGuard],
      loadChildren: () =>
        import('./feature/admin-area/admin-area.module').then((x)=> x.AdminAreaModule)
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
