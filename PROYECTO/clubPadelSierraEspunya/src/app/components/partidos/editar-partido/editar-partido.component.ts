import { Component, OnInit } from '@angular/core';
import { Socio } from '../../../service/Socio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidosService } from '../../../service/partidos.service';
import { SociosService } from '../../../service/socios.service';
import { Partido } from '../../../service/Partido';

@Component({
  selector: 'app-editar-partido',
  templateUrl: './editar-partido.component.html',
  styleUrl: './editar-partido.component.scss'
})
export class EditarPartidoComponent implements OnInit {
  // Variables necesarias
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: Socio = new Socio();
  formularioPartido: FormGroup;
  sociosDisponibles: any;
  horas: any;
  socioDefecto: Socio = new Socio();
  horasValidas: string[];
  fechaPartido: any;
  horaPartido: any;
  pistaPartido: any;
  idPartido: any;
  edit: any;
  partidoEditar: any;
  constructor(
    public formulario: FormBuilder,
    private activeRoute: ActivatedRoute,
    private partidosService: PartidosService,
    private socioService: SociosService,
    private router: Router,
  ) {
    // Se recogen por parámetros los campos fecha, hora y pista del partido
    // También el id del partido y si es edit
    this.fechaPartido = this.activeRoute.snapshot.paramMap.get('fecha');
    this.horaPartido = this.activeRoute.snapshot.paramMap.get('hora');
    this.pistaPartido = this.activeRoute.snapshot.paramMap.get('pista');
    this.idPartido = this.activeRoute.snapshot.paramMap.get('id');
    this.edit = this.activeRoute.snapshot.paramMap.get('edit');
    // Se inicializa el formulario para editar un partido. Se establecen los campos obligatorios
    this.formularioPartido = this.formulario.group({
      socio1: ['', Validators.required],
      socio2: ['', Validators.required],
      socio3: ['', Validators.required],
      socio4: ['', Validators.required],
      pista: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      abierto: ['S'],
      finalizado: ['N'],
    });
    // Se establecen las horas válidas
    this.horasValidas = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
  }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se recoge de localStorage el usuario actual y si es o no admin
    this.usuarioLogin = new Socio();
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage!.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage!.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
    // Se llama a BBDD para obtener los socios y mostrarlos en los selectores
    this.socioService.obtenerSocios().subscribe(respuesta => {
      this.sociosDisponibles = respuesta;
      // Se inicializa el socio por defecto para añadirlo al inicio de la lista después
      this.socioDefecto = this.sociosDisponibles.filter((s: { id: number }) => s.id == -1)[0];
      // Nos quedamos con los usuarios que no seamos nosotros, otro socio o admin.
      this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio");
      this.sociosDisponibles[0] = this.socioDefecto;
      // Establecemos las horas válidas de los partidos
      this.horasValidas = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
      // Llamamos al método que carga las horas válidas
      this.cargarHorasValidas(this.horasValidas);
      // Llamo a BBDD para obtener los datos del partido por el id
      this.partidosService.getPartido(this.idPartido).subscribe(respuesta => {
        // Guardo el resultado en una variable
        this.partidoEditar = respuesta[0];
        // Se cargan los valores del formulario con los datos del partido obtenido
        this.formularioPartido.setValue({
          socio1: respuesta[0]['socio1'],
          socio2: respuesta[0]['socio2'],
          socio3: respuesta[0]['socio3'],
          socio4: respuesta[0]['socio4'],
          pista: respuesta[0]['pista'],
          fecha: respuesta[0]['fecha'],
          hora: respuesta[0]['hora'],
          abierto: respuesta[0]['abierto'],
          finalizado: respuesta[0]['finalizado']
        });
        // Se llama al método deshabilitarSocio con los 4 socios para ver si hay que deshabilitar o no ese selector
        this.deshabilitarSocio('socio1');
        this.deshabilitarSocio('socio2');
        this.deshabilitarSocio('socio3');
        this.deshabilitarSocio('socio4');
        // Se deshabilitan los campos pista, fecha y hora porque no son editables
        this.formularioPartido.get('pista')?.disable();
        this.formularioPartido.get('fecha')?.disable();
        this.formularioPartido.get('hora')?.disable();
      });
    });
  }

  // Método que deshabilita el selector del socio introducido si ese selector tiene como dato un socio distinto al genérico y al socio actual
  deshabilitarSocio(socio: string) {
    const soc = this.formularioPartido.get(socio)?.value;
    if (Number(soc) !== -1 && Number(soc) != this.usuarioLogin.id) {
      this.formularioPartido.get(socio)?.disable();
    }
  }

  // Método que se llama cuando se pulsa el botón editar. Se prepara el partido a editar y se llama a BBDD para editarlo. 
  enviarDatos(): any {
    let partidoAccionEditar = this.prepararPartidoEditar();
    this.partidosService.editarPartido(this.idPartido, partidoAccionEditar).subscribe(respuesta => {
      this.router.navigateByUrl('/inicio/partidos');
    });
  }

  // Método para preparar el partido a editar. Se establecen los valores por defecto y para los 4 selectores se comprueba si no se ha cambiado el valor. Si no se ha cambiado se queda el valor que tenían al empezar a editar
  private prepararPartidoEditar() {
    let partidoAccionEditar = new Partido();
    partidoAccionEditar.id = this.idPartido;
    partidoAccionEditar.abierto = this.partidoEditar.abierto;
    partidoAccionEditar.finalizado = this.partidoEditar.finalizado;
    partidoAccionEditar.hora = this.partidoEditar.hora;
    partidoAccionEditar.fecha = this.partidoEditar.fecha;
    partidoAccionEditar.pista = this.partidoEditar.pista;
    if (this.formularioPartido.get('socio1')!.value) {
      partidoAccionEditar.socio1 = Number(this.formularioPartido.get('socio1')!.value);
    } else {
      partidoAccionEditar.socio1 = this.partidoEditar.socio1;
    }
    if (this.formularioPartido.get('socio2')!.value) {
      partidoAccionEditar.socio2 = Number(this.formularioPartido.get('socio2')!.value);
    } else {
      partidoAccionEditar.socio2 = this.partidoEditar.socio2;
    }
    if (this.formularioPartido.get('socio3')!.value) {
      partidoAccionEditar.socio3 = Number(this.formularioPartido.get('socio3')!.value);
    } else {
      partidoAccionEditar.socio3 = this.partidoEditar.socio3;
    }
    if (this.formularioPartido.get('socio4')!.value) {
      partidoAccionEditar.socio4 = Number(this.formularioPartido.get('socio4')!.value);
    } else {
      partidoAccionEditar.socio4 = this.partidoEditar.socio4;
    }
    partidoAccionEditar.pareja_ganadora = "";
    return partidoAccionEditar;
  }

  // Método que nos carga las horas válidas del partido
  cargarHorasValidas(horasValidas: string[]) {
    this.horas = [];
    this.horas.push("");
    for (let hora of horasValidas) {
      this.horas.push(hora);
    }
  }

  // Método que comprueba si hay socios repetidos en el formulario
  // Comprueba los valores de los 4 selectores de los jugadores
  comprobarSociosRepetidos() {
    let idsSocios = [];
    let socio1 = this.formularioPartido.get('socio1')?.value;
    let socio2 = this.formularioPartido.get('socio2')?.value;
    let socio3 = this.formularioPartido.get('socio3')?.value;
    let socio4 = this.formularioPartido.get('socio4')?.value;
    if (!socio2 || !socio3 || !socio4) {
      return false;
    }
    idsSocios.push(socio1);
    if (idsSocios.includes(socio2) && socio2 != -1) {
      return true;
    } else {
      idsSocios.push(socio2);
    }
    if (idsSocios.includes(socio3) && socio3 != -1) {
      return true;
    } else {
      idsSocios.push(socio3);
    }
    if (idsSocios.includes(socio4) && socio4 != -1) {
      return true;
    } else {
      idsSocios.push(socio4);
    }
    return false;
  }

  // Método que comprueba si se ha introducido un socio válido en el selector 1, ya que si no no se puede crear/editar
  comprobarSocioValidoIntroducido() {
    let socio1 = this.formularioPartido.get('socio1')?.value;
    if(!socio1){
      socio1 = this.partidoEditar.socio1;
    }
    if (socio1 == -1) {
      return false;
    }else{
      return true;
    }
  }

  // Método que comprueba si el socio actual está introducido en algún selector
  comprobarSociosActualIntroducido() {
    // Si es editar, devolvemos true porque se puede quitar del partido el socio actual, ya que en este caso el socio ya está en el partido
    if(this.edit && this.edit == 'S'){
      return true;
    }
    // Obtenemos los valores de los 4 selectores de jugadores
    let idsSocios = [];
    let socio1 = this.formularioPartido.get('socio1')?.value;
    let socio2 = this.formularioPartido.get('socio2')?.value;
    let socio3 = this.formularioPartido.get('socio3')?.value;
    let socio4 = this.formularioPartido.get('socio4')?.value;
    if (!socio1 || !socio2 || !socio3 || !socio4) {
      return false;
    }
    // Los añadimos a una lista
    idsSocios.push(socio1);
    idsSocios.push(socio2);
    idsSocios.push(socio3);
    idsSocios.push(socio4);
    // Devolvemos si el id del usuario actual está dentro de esa lista de valores con los valores de los selectores
    return idsSocios.includes(this.usuarioLogin.id);
  }

  // Método que nos devuelve nombre y apellidos del socio introducido
  getSocio(socio: Socio) {
    return socio.nombre + ' ' + socio.apellidos;
  }
}
