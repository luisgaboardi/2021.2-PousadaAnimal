
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./feature/panel/panel.module').then((x) => x.PanelModule)
  // },
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
    path: 'hosting',
      loadChildren: () =>
        import('./feature/hosting/hosting.module').then((x)=> x.HostingModule)
  },
  {
    path: 'user-area',
      loadChildren: () =>
        import('./feature/user-area/user-area.module').then((x)=> x.UserAreaModule)
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
