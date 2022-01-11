import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { EmailValidatorService } from 'src/app/shared/email-validator/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  // miFormulario: FormGroup = this.fb.group({
  //   nombre: [ '', [ Validators.required, Validators.pattern( nombreApellidoPattern ) ] ],
  //   email: [ '', [ Validators.required, Validators.pattern( emailPattern ) ] ],
  //   username: [ '', [ Validators.required, noPuedeSerStrider ] ]
  
  // })

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern ) ] ],
    email: [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.ev ] ],
    username: [ '', [ Validators.required, this.vs.noPuedeSerStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ]
  },
  {
    validators: [ this.vs.camposIguales('password', 'password2') ]
  });


  //emailErrorMsg: string = '';

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.['required']) {
      return 'El correo es requerido';
    } else if ( errors?.['pattern']) {
      return 'El formato de correo es inválido';
    } else if ( errors?.['emailExistente']) {
      return 'El correo ya existe';
    }

    return '';
    
  }

  constructor( private fb: FormBuilder, 
               private vs: ValidatorService,
               private ev: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Nombre Apellido',
      email: 'test1@test.com',
      username: 'usuarioB',
      password: '123456',
      password2: '123456'
    })
  }

  esCampoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched;
  }

  // emailRequerido() {
  //   return this.miFormulario.get('email')?.errors?.['required'] &&
  //          this.miFormulario.get('email')?.touched;
  // }
  
  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern'] &&
  //          this.miFormulario.get('email')?.touched;
  // }

  // emailExistente() {
  //   return this.miFormulario.get('email')?.errors?.['emailExistente'] &&
  //          this.miFormulario.get('email')?.touched;
  // }

  crear() {
    
    this.miFormulario.markAllAsTouched();
  }
}
