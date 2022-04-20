import { ModalService } from 'src/app/core/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isTextField!: boolean;

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,
    Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private readonly loginServiceClient: LoginService,
    private readonly router: Router,
    private readonly AlertModalService: ModalService
  ) { }

  ngOnInit(): void { }

  showPassword() {
    this.isTextField = !this.isTextField;
  }

  loginClient() {
    console.log("Fazer login")
    if(this.formLogin.valid){
      let login = Object.assign({}, this.formLogin.value);

      this.loginServiceClient.sendLoginClient(login).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', JSON.stringify(response.token));
          if(response.user.staff){
            this.router.navigate(['/admin-area/home-admin']);
          }else{
            this.router.navigate(['/user-area/home-user']);
          }
        },
        error: (error) => {
          this.handleError();
          this.router.navigate(['/auth/login']);
          console.log("Erro ao registrar", error); //definir tipos de erros
        }
      }
      )
    }

  }

  logoutClient() {
    console.log("Log out");
    this.loginServiceClient.logout()
  }

  handleError(){
   this.AlertModalService.showAlertDanger('Usuário ou senha inválidos. Tente novamente');
  }

}
