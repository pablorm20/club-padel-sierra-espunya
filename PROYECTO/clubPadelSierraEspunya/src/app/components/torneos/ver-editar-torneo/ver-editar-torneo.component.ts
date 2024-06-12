import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneosService } from '../../../service/torneos.service';
import { Util } from '../../../service/Util';
import { ImagenesService } from '../../../service/imagenes.service';
import { Torneo } from '../../../service/Torneo';

@Component({
  selector: 'app-ver-editar-torneo',
  templateUrl: './ver-editar-torneo.component.html',
  styleUrl: './ver-editar-torneo.component.scss'
})
export class VerEditarTorneoComponent implements OnInit {
  // Variables necesarias
  formularioTorneo: FormGroup;
  idTorneo: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: "",
    carpeta: ""
  }
  imagenbase64: string;
  genero: string;
  foto: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private torneoService: TorneosService,
    public formulario: FormBuilder,
    private router: Router,
    private imagenService: ImagenesService
  ) {
    // Se inicializa variable que almacena la foto del torneo
    this.imagenbase64 = "";
    // Se recoje el id del torneo a editar para poder recuperar sus datos
    this.idTorneo = this.activeRoute.snapshot.paramMap.get('id');
    // Se inicializa el formulario para editar el torneo. Se establecen los campos obligatorios
    this.formularioTorneo = this.formulario.group({
      nombre: ['', Validators.required],
      max_parejas: ['', Validators.required],
      parejas_apuntadas: ['', Validators.required],
      puntos_campeon: ['', Validators.required],
      puntos_subcampeon: ['', Validators.required],
      puntos_semifinal: ['', Validators.required],
      puntos_cuartos: ['', Validators.required],
      puntos_octavos: ['', Validators.required],
      puntos_resto: [0],
      inscripcion_abierta: ['', Validators.required],
      finalizado: [''],
      foto: [''],
      genero: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    this.genero = '';
    this.foto = '';
  }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se llama a BBDD para obtener el torneo del id recibido por parámetros
    this.torneoService.getTorneo(this.idTorneo).subscribe(respuesta => {
      // Se asignan los valores de los campos del formularios con los campos recogidos del torneo 
      this.formularioTorneo.setValue({
        nombre: respuesta[0]['nombre'],
        max_parejas: respuesta[0]['max_parejas'],
        parejas_apuntadas: respuesta[0]['parejas_apuntadas'],
        puntos_campeon: respuesta[0]['puntos_campeon'],
        puntos_subcampeon: respuesta[0]['puntos_subcampeon'],
        puntos_semifinal: respuesta[0]['puntos_semifinal'],
        puntos_cuartos: respuesta[0]['puntos_cuartos'],
        puntos_octavos: respuesta[0]['puntos_octavos'],
        puntos_resto: 0,
        inscripcion_abierta: respuesta[0]['inscripcion_abierta'],
        finalizado: respuesta[0]['finalizado'],
        foto: '',
        genero: respuesta[0]['genero'],
        fecha: respuesta[0]['fecha'],
      });
      // Si el torneo está finalizado se deshabilita porque no se puede editar
      if (respuesta[0]['finalizado'] == 'S') {
        this.formularioTorneo.disable();
      }
      // Se almacenan los campos genero y foto para tenerlos controlados
      this.genero = respuesta[0]['genero'];
      this.foto = respuesta[0]['foto'];
      // Se establece la foto a mostrar con el valor de la foto del torneo
      this.imagenbase64 = Util.URLImagenes + respuesta[0]['foto'];
      // Se deshabilita el campo género porque no se puede editar
      this.formularioTorneo.get('genero')!.disable();
    });

  }

  // Método que se ejecuta cuando se selecciona una nueva imagen del dispositivo. También sube esa imagen al servidor para almacenarla y solo guardar en BBDD el enlace a esa imagen del servidor
  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if (files && file) {
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
        if (datos['resultado'] == 'OK') {
          this.formularioTorneo.get('foto')!.setValue("torneos/" + this.archivo.nombreArchivo);
          this.imagenbase64 = Util.URLImagenes + "torneos/" + this.archivo.nombreArchivo;
        }
      }
    );
  }

  // Método que se ejecuta cuando se pulsa el botón editar
  enviarDatos(): any {
    // Se prepara el objeto torneo con el campo genero guardado al iniciar y la foto si se ha editado
    this.formularioTorneo.get('genero')?.setValue(this.genero);
    let torneo = this.formularioTorneo.value;
    torneo.genero = this.genero;
    if(!torneo.foto){
      torneo.foto = this.foto;
    }
    // Una vez que está listo se llama a BBDD para editar el torneo con ese id
    this.torneoService.editarTorneo(this.idTorneo, this.formularioTorneo.value).subscribe(respuesta => {
      this.router.navigateByUrl('/inicio/torneos');
    });
  }
}