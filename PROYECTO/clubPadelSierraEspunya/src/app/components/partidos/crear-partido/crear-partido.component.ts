import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartidosService } from '../../../service/partidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SociosService } from '../../../service/socios.service';
import { Socio } from '../../../service/Socio';
import { Partido } from '../../../service/Partido';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.component.html',
  styleUrl: './crear-partido.component.scss'
})
export class CrearPartidoComponent implements OnInit {
  // Variables necesarias
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: Socio = new Socio();
  formularioNuevoPartido: FormGroup;
  sociosDisponibles: any;
  horas: any;
  socioDefecto: Socio = new Socio();
  horasValidas: string[];
  fechaPartido: any;
  horaPartido: any;
  pistaPartido: any;
  constructor(
    public formulario: FormBuilder,
    private activeRoute:ActivatedRoute,
    private partidosService: PartidosService,
    private socioService: SociosService,
    private router: Router,
  ) {
    // Se recogen por parámetros los campos fecha, hora y pista del partido
    this.fechaPartido=this.activeRoute.snapshot.paramMap.get('fecha');
    this.horaPartido=this.activeRoute.snapshot.paramMap.get('hora');
    this.pistaPartido=this.activeRoute.snapshot.paramMap.get('pista');
    // Se inicializa el formulario para crear un nuevo partido. Se establecen los campos obligatorios
    this.formularioNuevoPartido = this.formulario.group({
      socio1: ['', Validators.required],
      socio2: ['', Validators.required],
      socio3: ['', Validators.required],
      socio4: ['', Validators.required],
      pista: [''],
      fecha: [''],
      hora: [''],
      abierto: ['S'],
      finalizado: ['N'],
    });
    // Para los campos fecha, hora y pista se establecen los campos que venían como parámetros y se deshabilitan esos campos
    this.formularioNuevoPartido.get('fecha')?.setValue(this.fechaPartido);
    this.formularioNuevoPartido.get('fecha')?.disable();
    this.formularioNuevoPartido.get('hora')?.setValue(this.horaPartido);
    this.formularioNuevoPartido.get('hora')?.disable();
    this.formularioNuevoPartido.get('pista')?.setValue(this.pistaPartido);
    this.formularioNuevoPartido.get('pista')?.disable();
    // Se establecen las horas válidas
    this.horasValidas = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
  }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se recoge de localStorage el usuario actual y si es o no admin
    this.usuarioLogin = new Socio();
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage?.getItem('usuario')!);
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
      this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio" && s.id !== this.usuarioLogin.id);
      this.sociosDisponibles[0] = this.socioDefecto;
      // Establecemos las horas válidas de los partidos
      this.horasValidas = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
      // Llamamos al método que carga las horas válidas
      this.cargarHorasValidas(this.horasValidas);
      // Inicializamos el selector del socio 1 con el socio logueado.
      this.formularioNuevoPartido.get('socio1')!.setValue(this.usuarioLogin.id);
      /*
      let fechaActual = new Date();
      this.formularioNuevoPartido.get('fecha')?.setValue(fechaActual.getFullYear() + '-' + this.getValor((fechaActual.getMonth() + 1).toString()) + '-' + fechaActual.getDate());
    */
    });
  }
  
  // Método que devuelve el valor añadiendo un 0 delante si es necesario
  getValor(mes: string) {
    if (mes.length == 1) {
      return "0" + mes;
    } else {
      return mes;
    }
  }

  // Método que se ejecuta cuando se pulsa el botón añadir
  enviarDatos(): any {
    // Se establecen los valores que viene predefinidos por parámetros
    this.formularioNuevoPartido.get('fecha')?.setValue(this.fechaPartido);
    this.formularioNuevoPartido.get('hora')?.setValue(this.horaPartido);
    this.formularioNuevoPartido.get('pista')?.setValue(this.pistaPartido);
    // Se prepara el objeto para crearlo
    let partidoACrear = new Partido();
    partidoACrear.fecha = this.fechaPartido;
    partidoACrear.hora = this.horaPartido;
    partidoACrear.pista = this.pistaPartido;
    // Se recogen los campos que se pueden editar.
    partidoACrear.abierto = this.formularioNuevoPartido.get('abierto')?.value;
    partidoACrear.finalizado = this.formularioNuevoPartido.get('finalizado')?.value;
    partidoACrear.socio1 = this.formularioNuevoPartido.get('socio1')?.value;
    partidoACrear.socio2 = this.formularioNuevoPartido.get('socio2')?.value;
    partidoACrear.socio3 = this.formularioNuevoPartido.get('socio3')?.value;
    partidoACrear.socio4 = this.formularioNuevoPartido.get('socio4')?.value;
    // Se llama a BBDD con el objeto partido para añadirlo a la tabla
      this.partidosService.agregarPartido(partidoACrear).subscribe(respuesta => {
        // Una vez añadido se vuelve a la página principal de partidos
        this.router.navigateByUrl('/inicio/partidos');
      });
  }

  // Método que carga la horas válidas de la pista
  cargarHorasValidas(horasValidas: string[]) {
    this.horas = [];
    this.horas.push("");
    for (let hora of horasValidas) {
      this.horas.push(hora);
    }
  }

  // Método que comprueba si hay socios repetidos en el formulario
  // Comprueba los valores de los 3 selectores de los jugadores
  comprobarSociosRepetidos() {
    let idsSocios = [];
    let socio2 = this.formularioNuevoPartido.get('socio2')?.value;
    let socio3 = this.formularioNuevoPartido.get('socio3')?.value;
    let socio4 = this.formularioNuevoPartido.get('socio4')?.value;
    if (!socio2 || !socio3 || !socio4) {
      return false;
    }
    idsSocios.push(socio2);
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

  // Método que nos devuelve nombre y apellidos del socio introducido
  getSocio(socio: Socio) {
    return socio.nombre + ' ' + socio.apellidos;
  }
}

