import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../../../service/premios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagenesService } from '../../../service/imagenes.service';
import { Util } from '../../../service/Util';

@Component({
  selector: 'app-crear-premio',
  templateUrl: './crear-premio.component.html',
  styleUrl: './crear-premio.component.scss'
})
export class CrearPremioComponent implements OnInit {
    // Variables necesarias
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: "",
    carpeta: ""
  }
  formularioNuevoPremio: FormGroup;
  imagenbase64: string;
  constructor(
    public formulario: FormBuilder,
    private premiosService: PremiosService,
    private router: Router,
    private imagenService: ImagenesService
  ) {

    // Se inicializa el formulario para crear el premio. Se establecen los campos obligatorios
    this.formularioNuevoPremio = this.formulario.group({
      nombre: ['', Validators.required],
      puntos: ['', Validators.required],
      foto: ['', Validators.required]
    })
    // Se inicializa variable que almacena la foto del premio
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

  // Método que almacena la imagen seleccionada en el servidor en la carpeta premios. Si se sube la imagen al servidor, se asigna la url de la imagen a la variable para mostrar la imagen. 
  // También se asigna ese valor al campo foto del formulario para que cambie también en BBDD si se confirma el cambio.
  upload() {
    console.log(this.archivo);
    this.archivo.carpeta = "premios";
    this.imagenService.uploadFile(this.archivo).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          this.formularioNuevoPremio.get('foto')!.setValue("premios/" + this.archivo.nombreArchivo);
          this.imagenbase64 = Util.URLImagenes + "premios/" + this.archivo.nombreArchivo;
        }
      }
    );
  }

  // Método que se ejecuta cuando se pulsa el botón añadir
  enviarDatos(): any {
    // Se llama a BBDD para editar el premios con ese id
    this.premiosService.agregarPremio(this.formularioNuevoPremio.value).subscribe(_respuesta => {
      this.router.navigateByUrl('/inicio/premios');
    });
  }

}

