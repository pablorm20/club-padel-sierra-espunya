import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PremiosService } from '../../../service/premios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../../../service/Util';
import { ImagenesService } from '../../../service/imagenes.service';

@Component({
  selector: 'app-editar-premio',
  templateUrl: './editar-premio.component.html',
  styleUrl: './editar-premio.component.scss'
})
export class EditarPremioComponent implements OnInit {
  // Variables necesarias
  formularioPremio: FormGroup;
  idPremio:any;
  imagenbase64: string;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: "",
    carpeta: ""
  }
  foto: string;
  constructor(
    private activeRoute:ActivatedRoute,
    private premiosService:PremiosService,
    public formulario: FormBuilder,
    private router:Router,
    private imagenService: ImagenesService
  ){
    // Se inicializa variable que almacena la foto del premio
    this.imagenbase64 = "";
    // Se recoje el id del premio a editar para poder recuperar sus datos
    this.idPremio=this.activeRoute.snapshot.paramMap.get('id');
    // Se inicializa el formulario para editar el premio. Se establecen los campos obligatorios
    this.formularioPremio = this.formulario.group({
      nombre: ['', Validators.required],
      puntos: ['', Validators.required],
      foto: ['']
    });
    this.foto = '';
  }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se llama a BBDD para obtener el premio del id recibido por parámetros
    this.premiosService.getPremio(this.idPremio).subscribe(respuesta=>{
      // Se asignan los valores de los campos del formularios con los campos recogidos del premio 
      this.formularioPremio.setValue({
        nombre:respuesta[0]['nombre'],
        puntos:respuesta[0]['puntos'],
        foto:''
      });
      this.foto = respuesta[0]['foto'];
      // Se establece la foto a mostrar con el valor de la foto del premio
      this.imagenbase64 = Util.URLImagenes + respuesta[0]['foto'];
    });

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

  // Método que almacena la imagen seleccionada en el servidor en la carpeta premios. Si se sube la imagen al servidor, se asigna la url de la imagen a la variable para mostrar la imagen. 
  // También se asigna ese valor al campo foto del formulario para que cambie también en BBDD si se confirma el cambio.
  upload() {
    this.archivo.carpeta = "premios";
    this.imagenService.uploadFile(this.archivo).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          this.formularioPremio.get('foto')!.setValue("premios/" + this.archivo.nombreArchivo);
          this.imagenbase64 = Util.URLImagenes + "premios/" + this.archivo.nombreArchivo;
        }
      }
    );
  }

  // Método que se ejecuta cuando se pulsa el botón editar
  enviarDatos(): any {
    let premio = this.formularioPremio.value;
    if(!premio.foto){
      premio.foto = this.foto;
    }
    // Se llama a BBDD para editar el premios con ese id
    this.premiosService.editarPremio(this.idPremio, this.formularioPremio.value).subscribe(respuesta=>{
      this.router.navigateByUrl('/inicio/premios');
    });
  }
}
