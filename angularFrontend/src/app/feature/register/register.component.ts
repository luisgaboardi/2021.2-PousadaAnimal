import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isTextField!: boolean;
  formRegister!: FormGroup;

  genderList = [
    { nome: 'Masculino'},
    { nome: 'Feminino'},
    {nome: 'Outro'}
  ];

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.instanceFormRegister();
  }

  instanceFormRegister(){
    this.formRegister = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i),
        ],
      ],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      cpf: ['',[Validators.required]], //criar serviço de validação - talvez
      phone: ['', [Validators.required]],// criar serviço de validação - talvez
      cep: ['', [Validators.required]],
      address: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      dateBirth: ['', [Validators.required]], //definir numero de caracteres
      password: ['', [Validators.required]]// definir numero de caracteres
      // talvez fazer outro campo para a confirmação de senha
    });
  }
  showPassword() {
    this.isTextField = !this.isTextField;
  };

  cadastrarCliente(){
    console.log("Fazer cadastro")
  }


}
