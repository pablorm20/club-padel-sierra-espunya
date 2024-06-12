import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Socio } from '../../service/Socio';
import { SociosService } from '../../service/socios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  // Variables necesarias
  formularioLogin: FormGroup;
  socioLogin: Socio;
  socios: any;
  seccion: any;
  noValidUsuario = false;
  noValidContrasenya = false;

  constructor(
    private activeRoute: ActivatedRoute,
    public formulario: FormBuilder,
    private socioService: SociosService,
    private router: Router
  ) {
    // Creamos el formulario con usuario y contraseña
    this.formularioLogin = this.formulario.group({
      usuario: [''],
      password: ['']
    })
    // Inicializamos la variable donde guardaremos los datos del socio que se quiere loguear
    this.socioLogin = new Socio();
  }

  ngOnInit(): void {
    // Al iniciarse el componente obtenemos los socios de BBDD y si viene el login desde alguna sección. Lo de la sección es si por ejemplo el usuario ha pulsado Más información en la 
    // vista de torneos, así se sabe que al acceder tiene que ir directamente a esa sección.
    this.socioService.obtenerSocios().subscribe(respuesta => {
      this.socios = respuesta;
      this.seccion = this.activeRoute.snapshot.paramMap.get('seccion');
    });
  }

  // Método que se ejecuta cuando se pulsa el botón acceder.
  enviarDatos(): any {
    // Inicializamos de nuevo el socio
    this.socioLogin = new Socio();
    // Cogemos el socio de BBDD cuyo usuario se haya introducido en el formulario.
    for (let soc of this.socios) {
      if (soc.usuario === this.formularioLogin.get('usuario')!.value) {
        this.socioLogin = soc;
        break;
      }
    }
    // Si el usuario introducido existe
    if (this.socioLogin.usuario) {
      this.noValidUsuario = false;
      // Comprobamos que su contraseña coincida con la introducida en el formulario
      if (this.socioLogin.contrasenya === this.formularioLogin.get('password')!.value) {
        // Si coincide usuario y contraseña
        this.noValidContrasenya = false;
        // Guardamos en localStorage los datos del usuario logueado
        localStorage.setItem('usuario', JSON.stringify(this.socioLogin));
        // Guardamos también si el usuario es Administrador o no
        if (this.socioLogin.nombre === 'Administrador') {
          localStorage.setItem('isAdmin', "SI");
        } else {
          localStorage.setItem('isAdmin', "NO");
        }
        // Si viene alguna sección como parámetro vamos a la ruta inicio/ la sección introducida. /inicio nos lleva a la pantalla principal del usuario logueado.
        if(this.seccion){
          this.router.navigateByUrl('/inicio/' + this.seccion);
        }else{
          // Si no hay sección nos lleva a la página principal
          this.router.navigateByUrl('/inicio');
        }
      } else {
        //ERROR. CONTRASENYA INCORRECTA. LA CONTRASEÑA NO COINCIDE CON LA DEL USUARIO INTRODUCIDO
        this.noValidContrasenya = true;
      }
    } else {
      //ERROR. NO EXISTE USUARIO. NO SE HA INTRODUCIDO UN USUARIO VÁLIDO
      this.noValidUsuario = true;
    }
  }
}
