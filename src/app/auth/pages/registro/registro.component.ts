import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';


import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre   : [ '', [Validators.required, Validators.pattern( this.validatoService.nombreApellidoPattern )]],
    email    : [ '', [Validators.required, Validators.pattern( this.validatoService.emailPattern )], [ this.emailValidator] ],
    username : [ '', [Validators.required, this.validatoService.noPuedeSerStrider]],
    password : [ '', [Validators.required, Validators.minLength(6)]],
    password2: [ '', [Validators.required, ]],
    },{
      validators: [ this.validatoService.camposIguales('password','password2') ]
    });


    get emailErrorMsg(): string{

    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.required){
      return 'Email es obligatorio';
    }else if( errors?.pattern){
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado){
      return 'Este email ya esta asociado a una cuenta'
    }

    return '';

    }

  constructor( private fb: FormBuilder,
               private validatoService: ValidatorService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Daniel Castillo",
      email: 'test@test.com',
      username: 'Daniel-Cas',
      password: '123456',
      password2: '123456'
    })
  }


  campoNoValido( campo: string) {

    return this.miFormulario.get(campo)?.invalid 
    && this.miFormulario.get(campo)?.touched

  }

  


  submitFormulario() {
    
    console.log( this.miFormulario.value );
    this.miFormulario.markAllAsTouched();

  }

}
