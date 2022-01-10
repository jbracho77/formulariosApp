import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.formBuilder.array( [
      [ 'Fav1',  Validators.required ],
      [ 'Fav2',  Validators.required ]
    ], Validators.required )
  })

  nuevoFavorito: FormControl = this.formBuilder.control( '', Validators.required )

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
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

  agregarFavoritos() {
    if ( this.nuevoFavorito.invalid ) { return }

    this.favoritosArr.push( 
      this.formBuilder.control( 
        this.nuevoFavorito.value, Validators.required 
    ) );

    this.nuevoFavorito.reset();

  }

  borrarFavorito( indice: number) {

    this.favoritosArr.removeAt( indice );

  }

}
