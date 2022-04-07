import { ModalService } from 'src/app/core/services/modal.service';
import { RegisterService } from '../../../core/services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    password:  new FormControl('',[Validators.required]),
    password2: new FormControl('')
   });

  //  pass: FormGroup = new FormGroup ({
  //   password2: new FormControl('')
  //  });

  constructor(
    private readonly registerServiceClient: RegisterService,
    private readonly router : Router,
    private readonly AlertModalService: ModalService
  ) {}

  ngOnInit(): void {
    this.formRegister.setValidators(
      this.passwordEqual()
    );
  }

  showPassword() {
    this.isTextField = !this.isTextField;
  }

  public passwordEqual(): ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      const password = group.controls['password'];
      const passwordConfirm = group.controls['password2'];
      if(password.value !== passwordConfirm.value){
         passwordConfirm.setErrors({mustMatch: true});
      }else{
        passwordConfirm.setErrors(null);
      }
      return null;
    }
  }

  registerClient(){
    console.log("Fazer cadastro")
    const postRegister ={
      email: this.formRegister.controls['email'].value,
      first_name: this.formRegister.controls['first_name'].value,
      last_name: this.formRegister.controls['last_name'].value,
      cpf: this.formRegister.controls['cpf'].value,
      phone: this.formRegister.controls['phone'].value,
      cep: this.formRegister.controls['cep'].value,
      address: this.formRegister.controls['address'].value,
      gender: this.formRegister.controls['gender'].value,
      date_of_birth: this.formRegister.controls['date_of_birth'].value,
      password: this.formRegister.controls['password'].value,
    }
    //verificar se email e cpf existe
    if(this.formRegister.valid){
      let postRegister = Object.assign({}, this.formRegister.value);
      this.registerServiceClient.sendRegisterClient(postRegister).subscribe({
        next: () => {
          console.log("Deu bom");
          this.handleSucess();
          this.redirect();
        },
        error: (error) => {
          this.handleError();
          console.log("Erro ao registrar", error)
        }
      }
      )
    }
  }

  redirect(){
    this.router.navigate(['/auth/login']);
  }

  handleError(){
    this.AlertModalService.showAlertDanger('Erro ao cadastrar usuário. Tente novamente!');
   }
  handleSucess(){
    this.AlertModalService.showAlertSucess('Cadastro concluído!');
  }
}
