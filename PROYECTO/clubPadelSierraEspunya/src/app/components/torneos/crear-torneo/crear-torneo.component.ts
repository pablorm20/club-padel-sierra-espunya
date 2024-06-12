import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TorneosService } from '../../../service/torneos.service';
import { Router } from '@angular/router';
import { ImagenesService } from '../../../service/imagenes.service';
import { Util } from '../../../service/Util';

@Component({
  selector: 'app-crear-torneo',
  templateUrl: './crear-torneo.component.html',
  styleUrl: './crear-torneo.component.scss'
})
export class CrearTorneoComponent implements OnInit {
  // Variables necesarias
  formularioNuevoTorneo: FormGroup;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: "",
    carpeta: ""
  }
  imagenbase64: string;
  constructor(
    public formulario: FormBuilder,
    private torneoService:TorneosService,
    private router:Router,
    private imagenService: ImagenesService
    ) {

    // Se inicializa el formulario para crear un nuevo torneo. Se establecen los campos obligatorios
    this.formularioNuevoTorneo = this.formulario.group({
      nombre: ['', Validators.required],
      max_parejas: ['', Validators.required],
      parejas_apuntadas: [0],
      puntos_campeon: ['', Validators.required],
      puntos_subcampeon: ['', Validators.required],
      puntos_semifinal: ['', Validators.required],
      puntos_cuartos: ['', Validators.required],
      puntos_octavos: ['', Validators.required],
      puntos_resto: [0],
      inscripcion_abierta: ['', Validators.required],
      foto: [''],
      genero: ['', Validators.required],
      fecha: ['', Validators.required]
    })
    this.imagenbase64 = "";
    }

  ngOnInit(): void {

  }

  // Método que se ejecuta cuando se selecciona una nueva imagen del dispositivo. También sube esa imagen al servidor para almacenarla y solo guardar en BBDD el enlace a esa imagen del servidor
  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      setTimeout(() => this.upload(), 1000);
      
    }
  }

  // Método para obtener el contenido de la imagen para subirla al servidor.
  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  // Método que almacena la imagen seleccionada en el servidor en la carpeta torneos. Si se sube la imagen al servidor, se asigna la url de la imagen a la variable para mostrar la imagen. 
  // También se asigna ese valor al campo foto del formulario para que cambie también en BBDD si se confirma el cambio.
  upload() {
    this.archivo.carpeta = "torneos";
    this.imagenService.uploadFile(this.archivo).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          this.formularioNuevoTorneo.get('foto')!.setValue("torneos/" + this.archivo.nombreArchivo);
          this.imagenbase64 = Util.URLImagenes + "torneos/" + this.archivo.nombreArchivo;
        }
      }
    );
  }

  // Método que se ejecuta cuando se pulsa el botón de añadir. Añade el nuevo torneo y nos lleva a la página principal de torneos
  enviarDatos(): any {
    this.torneoService.agregarTorneo(this.formularioNuevoTorneo.value).subscribe(respuesta=>{
      this.router.navigateByUrl('/inicio/torneos');
    });
  }
}

