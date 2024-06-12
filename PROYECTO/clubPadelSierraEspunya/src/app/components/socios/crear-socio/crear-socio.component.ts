import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SociosService } from '../../../service/socios.service';

@Component({
  selector: 'app-crear-socio',
  templateUrl: './crear-socio.component.html',
  styleUrl: './crear-socio.component.scss'
})
export class CrearSocioComponent implements OnInit {
  // Variables necesarias
  formularioNuevoSocio: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private socioService:SociosService,
    private router:Router
    ) {

    // Se inicializa el formulario para crear un nuevo socio. Se establecen los campos obligatorios
    this.formularioNuevoSocio = this.formulario.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      genero: ['', Validators.required],
      usuario: ['', Validators.required],
      foto: ['socios/usuario_defecto.png']
    });

    }

  ngOnInit(): void {

  }

  // Método que se ejecuta cuando se pulsa el botón de añadir. Añade el nuevo socio y nos lleva a la página principal de socios
  enviarDatos(): any {
    this.socioService.agregarSocio(this.formularioNuevoSocio.value).subscribe(respuesta=>{
      this.router.navigateByUrl('/inicio/socios');
    });
  }

  // Método que nos valida si el dni introducido es válido
  validDNI(dni: string){
    if(dni){
      if(dni.length != 9){
        return false;
      }
      const dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
      var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
      
      return letter == dni.charAt(8);
    }else{
      return true;
    }
  };

  // Método que nos valida si el teléfono introducido es válido
  validTelefono(telefono: number){
    if(telefono){
      return telefono.toString().length == 9;
    }
    return true;
  }

}
