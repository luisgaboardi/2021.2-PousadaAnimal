import { RegisterService } from '../../../core/services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isTextField!: boolean;
  // formRegister: FormGroup;

  genderList = [
    { nome: 'Masculino' },
    { nome: 'Feminino' },
    { nome: 'Outro' }
  ];

  formRegister: FormGroup = new FormGroup ({
    email: new FormControl('',[Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)]),
    first_name: new FormControl('',[Validators.required]),
    last_name:  new FormControl('',[Validators.required]),
    cpf: new FormControl('',[Validators.required]),
    phone:  new FormControl('',[Validators.required]),
    cep:  new FormControl('',[Validators.required]),
    address:  new FormControl('',[Validators.required]),
    gender:  new FormControl('',[Validators.required]),
    date_of_birth: new FormControl('',[Validators.required]),
    password:  new FormControl('',[Validators.required])
  })

  constructor(
    private readonly registerServiceClient: RegisterService,
    private readonly router : Router
  ) { }

  ngOnInit(): void { }
  showPassword() {
    this.isTextField = !this.isTextField;
  }

  cadastrarCliente(){
    console.log("Fazer cadastro")
    //verificar se email e cpf existe
    if(this.formRegister.valid){
      let register = Object.assign({}, this.formRegister.value);

      this.registerServiceClient.sendRegisterClient(register).subscribe({
        next: () => { // definir data
          this.redirect();
        },
        error: (error) => {
          console.log("Erro ao registrar", error) //definir tipos de erros
        }
      }
      )
    }
  }

  redirect(){
    this.router.navigate(['/auth/login']);
  }


}
