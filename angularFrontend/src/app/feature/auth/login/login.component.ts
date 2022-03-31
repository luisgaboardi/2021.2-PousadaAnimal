import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

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
    private readonly router: Router
  ) { }

  ngOnInit(): void { }

  showPassword() {
    this.isTextField = !this.isTextField;
  }

  loginClient() {
    console.log("Fazer login")
    //verificar se email e cpf existe
    if (this.formLogin.valid) {
      let login = Object.assign({}, this.formLogin.value);

      this.loginServiceClient.sendLoginClient(login).subscribe({
        next: (response) => {
          localStorage.setItem('token', JSON.stringify(response.token));
          console.log("Deu bom");
          this.redirect();
        },
        error: (error) => {
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

  redirect() {
    this.router.navigate(['/user-area/home']);
  }

}
