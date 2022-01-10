import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 480'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // })

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ] ],
    precio: [ , [ Validators.required, Validators.min(0) ]  ],
    existencias: [ , [ Validators.required, Validators.min(0) ] ]
  })



  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    //this.miFormulario.setvalue
    this.miFormulario.reset ({
      nombre: 'Producto',
      precio: 5
    })
  }

  validarCampo( campo: string): boolean | null {
    return this.miFormulario.controls[ campo ]?.errors &&
           this.miFormulario.controls[ campo ]?.touched;

  }

  guardar() {

    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.miFormulario.reset();
  }

}
