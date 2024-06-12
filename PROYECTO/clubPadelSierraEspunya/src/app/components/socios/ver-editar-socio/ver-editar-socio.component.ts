import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SociosService } from '../../../service/socios.service';

@Component({
  selector: 'app-ver-editar-socio',
  templateUrl: './ver-editar-socio.component.html',
  styleUrl: './ver-editar-socio.component.scss'
})
export class VerEditarSocioComponent implements OnInit {
  // Variables necesarias
  formularioSocio: FormGroup;
  idSocio:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private socioService:SociosService,
    public formulario: FormBuilder,
    private router:Router
  ){
    // Se recoje el id del socio a editar para poder recuperar sus datos
    this.idSocio=this.activeRoute.snapshot.paramMap.get('id');
    // Se inicializa el formulario para editar el socio. Se establecen los campos obligatorios
    this.formularioSocio = this.formulario.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenya: ['', Validators.required],
      puntos_premios: ['', Validators.required],
      puntos_ranking: ['', Validators.required],
      torneos_jugados: ['', Validators.required],
      torneos_ganados: ['', Validators.required],
      partidos_jugados: ['', Validators.required],
      partidos_ganados: ['', Validators.required],
      premios_canjeados: ['', Validators.required],
      foto: ['']
    })
  }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se llama a BBDD para obtener el socio del id recibido por parámetros
    this.socioService.getSocio(this.idSocio).subscribe(respuesta=>{
      // Se asignan los valores de los campos del formularios con los campos recogidos del socio 
      this.formularioSocio.setValue({
        nombre:respuesta[0]['nombre'],
        apellidos:respuesta[0]['apellidos'],
        dni:respuesta[0]['dni'],
        correo:respuesta[0]['correo'],
        telefono:respuesta[0]['telefono'],
        genero:respuesta[0]['genero'],
        usuario:respuesta[0]['usuario'],
        contrasenya:respuesta[0]['contrasenya'],
        puntos_premios:respuesta[0]['puntos_premios'],
        puntos_ranking:respuesta[0]['puntos_ranking'],
        torneos_jugados:respuesta[0]['torneos_jugados'],
        torneos_ganados:respuesta[0]['torneos_ganados'],
        partidos_jugados:respuesta[0]['partidos_jugados'],
        partidos_ganados:respuesta[0]['partidos_ganados'],
        premios_canjeados:respuesta[0]['premios_canjeados'],
        foto:respuesta[0]['foto']
      });
    });

  }

// Método que se ejecuta cuando se pulsa el botón editar
  enviarDatos(): any {
    // Se llama a BBDD para editar el socio con ese id
    this.socioService.editarSocio(this.idSocio, this.formularioSocio.value).subscribe(respuesta=>{
      this.router.navigateByUrl('/inicio/socios');
    });
  }

  // Método que valida si el dni introducido es correcto
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

  // Método que valida si el teléfono introducido es correcto
  validTelefono(telefono: number){
    if(telefono){
      return telefono.toString().length == 9;
    }
    return true;
  }
}
