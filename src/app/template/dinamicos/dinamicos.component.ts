import { Component, OnInit } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  persona: Persona = {
    nombre: 'Nombre',
    favoritos: [
      {
        id: 1,
        nombre: 'Fav1'
      },
      {
        id: 2,
        nombre: 'Fav2'
      },
      {
        id: 3,
        nombre: 'Fav3'
      },
      {
        id: 4,
        nombre: 'Fav4'
      }
    ]
  }

  nuevoFavorito: string = '';

  
  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    
  }

  borrarFavorito(indice: number) {
    this.persona.favoritos.splice(indice, 1);
  }

  agregarFavorito() {
    const fav: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoFavorito
    }
    this.persona.favoritos.push({ ...fav });
    this.nuevoFavorito = '';
  }


}
