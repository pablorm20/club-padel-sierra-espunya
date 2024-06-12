import { Component, OnInit } from '@angular/core';
import { Socio } from '../../service/Socio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-inicio-usuario',
  templateUrl: './menu-inicio-usuario.component.html',
  styleUrl: './menu-inicio-usuario.component.scss'
})
export class MenuInicioUsuarioComponent implements OnInit {
  // Variables necesarias
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuario: Socio;
  constructor(
    private router: Router
  ) {
    // Inicializamos el usuario como un nuevo socio.
    this.usuario = new Socio();
  }

  // Método ngOnInit que se ejecuta cuando se inicia el componente. En él se recoge el usuario conectado a través de localStorage. Se necesita saber el usuario que hay para saber
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

  // Método que se ejecuta cuando pulsamos el botón Salir del menú
  cerrarSesion() {
    // Con Router vamos a la página de inicio de la aplicación y borramos de localStorage las variables relacionadas con el usuario logueado.
    // De esta forma cerramos la sesión, ya que nos lleva a la pantalla principal y como no hay variables en localStorage de usuario no hay nadie logueado
    this.router.navigateByUrl('');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('usuario');
    }
  }

}
