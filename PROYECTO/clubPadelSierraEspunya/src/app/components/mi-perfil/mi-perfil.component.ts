import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SociosService } from '../../service/socios.service';
import { Socio } from '../../service/Socio';
import { Util } from '../../service/Util';
import { ImagenesService } from '../../service/imagenes.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent implements OnInit {
  // Variables necesarias
  formularioSocio: FormGroup;
  formularioCambioContrasenya: FormGroup;
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: Socio = new Socio();
  imagenbase64: string;
  imagenbase64Editar: string;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: "",
    carpeta: ""
  }
  errores: any;
  constructor(
    private socioService: SociosService,
    public formulario: FormBuilder,
    private imagenService: ImagenesService
  ) {
    // Se inicializan a vacías las variables donde guardo las fotos. La del socio actual y la de actualizar
    this.imagenbase64 = "";
    this.imagenbase64Editar = "";
    // Inicializo el formulario que tendrá los datos del socio.
    this.formularioSocio = this.formulario.group({
      nombre: [''],
      apellidos: [''],
      dni: [''],
      correo: [''],
      telefono: [''],
      genero: [''],
      usuario: [''],
      contrasenya: [''],
      puntos_premios: [''],
      puntos_ranking: [''],
      torneos_jugados: [''],
      torneos_ganados: [''],
      partidos_jugados: [''],
      partidos_ganados: [''],
      premios_canjeados: [''],
      foto: ['']
    });
    // Inicializo el formulario que tendrá los datos de la contraseña para cambiarla.
    this.formularioCambioContrasenya = this.formulario.group({
      contrasenyaActual: ['', Validators.required],
      contrasenyaNueva: ['', Validators.required],
      contrasenyaNuevaRepetida: ['', Validators.required]
    })
  }

  // En el método ngOnInit se llama al método recargarSocio()
  ngOnInit(): void {
    this.recargarSocio();
  }

  // El método recargarSocio() se ejecuta al abrir el componente.
  recargarSocio() {
    // Se inicializa la variable con los datos del socio actual
    this.usuarioLogin = new Socio();
    // Se recoge del localStorage los datos del socio actual y si es o no admin.
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage?.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
    // Si hay usuario conectado
    if (this.usuarioLogin && this.usuarioLogin.id) {
      // Se recoge de BBDD los datos del socio actual.
      this.socioService.getSocio(this.usuarioLogin.id).subscribe(respuesta => {
        // Con esos datos se rellena el formulario del socio
        this.formularioSocio.setValue({
          nombre: respuesta[0]['nombre'],
          apellidos: respuesta[0]['apellidos'],
          dni: respuesta[0]['dni'],
          correo: respuesta[0]['correo'],
          telefono: respuesta[0]['telefono'],
          genero: respuesta[0]['genero'],
          usuario: respuesta[0]['usuario'],
          contrasenya: respuesta[0]['contrasenya'],
          puntos_premios: respuesta[0]['puntos_premios'],
          puntos_ranking: respuesta[0]['puntos_ranking'],
          torneos_jugados: respuesta[0]['torneos_jugados'],
          torneos_ganados: respuesta[0]['torneos_ganados'],
          partidos_jugados: respuesta[0]['partidos_jugados'],
          partidos_ganados: respuesta[0]['partidos_ganados'],
          premios_canjeados: respuesta[0]['premios_canjeados'],
          foto: respuesta[0]['foto']
        });
        // Se asigna el valor a la variable que muestra la imagen del socio
        this.imagenbase64 = Util.URLImagenes + respuesta[0]['foto'];
        this.imagenbase64Editar = "";
        // Se deshabilita el formulario del socio porque no se pueden editar los datos.
        this.formularioSocio.disable();
      });
    }
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

  // Método que almacena la imagen seleccionada en el servidor en la carpeta socios. Si se sube la imagen al servidor, se asigna la url de la imagen a la variable para mostrar la imagen. 
  // También se asigna ese valor al campo foto del formulario para que cambie también en BBDD si se confirma el cambio.
  upload() {
    this.archivo.carpeta = "socios";
    this.imagenService.uploadFile(this.archivo).subscribe(
      datos => {
        if (datos['resultado'] == 'OK') {
          this.formularioSocio.get('foto')!.setValue("socios/" + this.archivo.nombreArchivo);
          this.imagenbase64Editar = Util.URLImagenes + "socios/" + this.archivo.nombreArchivo;
        }
      }
    );
  }

  // Método que devuelve la imagen a mostrar en cada caso.
  getImagenEditar() {
    if (this.imagenbase64Editar) {
      return this.imagenbase64Editar;
    } else {
      return this.imagenbase64;
    }
  }

  // Método que cambia la foto del socio editando el socio en BBDD. Tras esto recarga los datos del socio para que se apliquen los cambios
  cambiarFoto() {
    this.socioService.editarSocio(this.usuarioLogin.id, this.formularioSocio.value).subscribe(respuesta => {
      this.recargarSocio();
    });
  }

  // Método que cambia la contraseña del socio editando el socio en BBDD. Primero pregunta la usuario si quiere cambiar la contraseña
  // Si dice que si se recargan los datos del socio para que se apliquen los cambios y se avisa del cambio realizado correctamente
  cambiarContrasenya() {
    if (window.confirm("¿Está seguro de cambiar la contraseña?")) {
      this.hideModalCerrar();
      this.usuarioLogin.contrasenya = this.formularioCambioContrasenya.get('contrasenyaNueva')?.value;
      this.socioService.editarSocio(this.usuarioLogin.id, this.usuarioLogin).subscribe(respuesta => {
        this.recargarSocio();
        alert('Contraseña actualizada con éxito');
      });
    }
  }

  // Método para comprobar si los campos del formulario de cambio de contraseña son correctos.
  comprobarCambioValido() {
    this.errores = [];
    // Se recogen los datos de los 3 campos del formulario
    const contraseActual = this.formularioCambioContrasenya.get('contrasenyaActual')?.value;
    const contraseNueva = this.formularioCambioContrasenya.get('contrasenyaNueva')?.value;
    const contraseNuevaRepetida = this.formularioCambioContrasenya.get('contrasenyaNuevaRepetida')?.value;
    // Si hay datos en los 3 campos
    if (contraseActual && contraseNueva && contraseNuevaRepetida) {
      // Si la contraseña actual introducida no coincide con la de BBDD. ERROR
      if (contraseActual !== this.usuarioLogin.contrasenya) {
        this.errores.push("La contraseña actual no corresponde a la introducida");
        return false;
      } 
      // Si la contraseña nueva introducida y su repetición no coinciden. ERROR
      if (contraseNueva != contraseNuevaRepetida) {
        this.errores.push("La contraseña nueva y su repetición no coinciden");
        return false;
      }
      // Si la contraseña nueva introducida es igual a la anterior. ERROR
      if (contraseNueva == contraseActual) {
        this.errores.push("La contraseña nueva es igual a la anterior");
        return false;
      }
      return true;
    }
    return true;
  }

  // Método que oculta el modal del cambio de contraseña una vez que se ha cambiado la contraseña.
  hideModalCerrar() {
    let modal = document.getElementById('cambiarContrasenya') as HTMLElement;
    let modalDismiss = modal.querySelector('[data-dismiss]') as HTMLButtonElement;
    let backdrop = document.querySelector('.modal-backdrop');

    modal.classList.remove('show');
    backdrop!.removeEventListener('click', this.hideModalCerrar.bind(this));
    modalDismiss.removeEventListener('click', this.hideModalCerrar.bind(this));

    setTimeout(function () {
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
      modal.removeAttribute('style');
      modal.setAttribute('aria-hidden', 'true');
      //document.body.removeAttribute('style');
      document.body.classList.remove('modal-open');
      backdrop!.remove();
    }, 100);
  }
}
