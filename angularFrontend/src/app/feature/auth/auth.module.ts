import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path:'login',
        loadChildren: ()  =>
        import ('./login/login.module').then((m) => m.LoginModule)
      },
      { path: 'cadastro-cliente',
        loadChildren: () => import ('./register/register.module'). then (m => m.RegisterModule)}
    ]
  }
]
@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
