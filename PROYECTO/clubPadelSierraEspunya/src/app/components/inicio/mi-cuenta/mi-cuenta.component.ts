import { Component, OnInit } from '@angular/core';
import { Socio } from '../../../service/Socio';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.scss'
})
export class MiCuentaComponent implements OnInit {
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuario: Socio;
  constructor(
  ) {
    this.usuario = new Socio();
  }
  // Método ngOnInit que se ejecuta cuando se inicia el componente. En él se recoge el usuario conectado a través de localStorage. Se necesita saber el usuario que hay para mostrar su nombre y saber
  // si es o no admin para mostrar una opción u otra en los enlaces de navegación
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuario = JSON.parse(localStorage?.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  }
