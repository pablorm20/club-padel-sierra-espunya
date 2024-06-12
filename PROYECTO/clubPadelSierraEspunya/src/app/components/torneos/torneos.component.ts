import { Component, OnInit, ViewChild } from '@angular/core';
import { TorneosService } from '../../service/torneos.service';
import { ParejasTorneosService } from '../../service/parejas-torneo.service';
import { Torneo } from '../../service/Torneo';
import { Socio } from '../../service/Socio';
import { ParejaTorneo } from '../../service/Pareja_Torneo';
import { MatDialog } from '@angular/material/dialog';
import { DialogApuntarseComponent } from '../dialog/dialog-apuntarse/dialog-apuntarse.component';
import { SociosService } from '../../service/socios.service';
import { DialogVerComponent } from '../dialog/dialog-ver/dialog-ver.component';
import { DialogCerrarTorneoComponent } from '../dialog/dialog-cerrar-torneo/dialog-cerrar-torneo.component';
import { SocioPareja } from '../../service/Socio_Pareja';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Util } from '../../service/Util';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.scss'
})
export class TorneosComponent implements OnInit {
  // Variables necesarias
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: Socio = new Socio();
  torneos: any;
  parejas: any;
  openApuntarse = false;
  sociosDisponibles: any;
  selectedValue: number[];
  parejasInscritas: SocioPareja[];
  torneoActual: Torneo = new Torneo();
  torneoApuntarse: Torneo = new Torneo();
  parejaCampeona: any;
  parejaSubcampeona: any;
  parejasSemifinal: any;
  parejasCuartos: any;
  parejasOctavos: any;
  errores: any;
  cerrarValido = false;

  nombresSociosApuntarse: string[];
  socioSeleccionado: string;

  displayApuntarse = false;
  public page!: number;
  constructor(
    private torneoservice: TorneosService,
    private socioService: SociosService,
    public dialog: MatDialog,
    private parejasTorneoService: ParejasTorneosService
  ) {
    // Se inicializan las variables del componente
    this.selectedValue = [];
    this.parejasInscritas = [];
    this.nombresSociosApuntarse = [];
    this.socioSeleccionado = "";
    this.nombresSociosApuntarse = [];
    this.parejasSemifinal = [];
    this.parejasCuartos = [];
    this.parejasOctavos = [];
    this.errores = [];
  }

  // Método ngOnInit
  ngOnInit(): void {
    // Se recoge de localStorage el usuario actual y si es admin
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
    // Se inicializan las variables del componente
    this.selectedValue = [];
    this.parejasInscritas = [];
    this.nombresSociosApuntarse = [];
    this.parejasSemifinal = [];
    this.parejasCuartos = [];
    this.parejasOctavos = [];
    this.socioSeleccionado = "";
    // Se recargan los torneos
    this.recargarTorneos();
    this.displayApuntarse = false;
  }

  // Método para recargar los torneos cuando se inicia el componente o cuando se hace alguna acción sobre ellos.
  recargarTorneos() {
    // Se llama a BBDD para obtener los torneos
    this.torneoservice.obtenerTorneos().subscribe(respuesta => {
      this.torneos = respuesta;
      this.torneos = this.torneos.filter((t: { id: number; }) => t.id > 0);
      // Se llama a BBDD para obtener las parejas
      this.parejasTorneoService.obtenerParejas().subscribe(parejas => {
        this.parejas = parejas;
        // Se le asigna a cada torneo sus parejas
        for (let torneo of this.torneos) {
          torneo.parejas = this.parejas.filter((p: { torneo: number; }) => Number(p.torneo) === Number(torneo.id));
        }
      });
    });
  }

  // Método para borrar un torneo. Primero se pide confirmación. Si se acepta se borran las parejas del torneo y el torneo. 
  borrarRegistro(id: number, iControl: number) {
    if (window.confirm("¿Desea borrar el registro?")) {
      this.parejasTorneoService.borrarTodasParejasTorneo(id).subscribe(respuesta => {
        this.torneoservice.borrarTorneo(id).subscribe(respuesta => {
          this.torneos.splice(iControl, 1);
        });
      });
    }
  }

  // Método que comprueba si es posible apuntarse al torneo. Depende de si tiene inscripción abierta, no está finalizado, no hay el número máximo de parejas apuntadas y la modaliad del torneo es mixta o es igual al género del socio actual
  apuntarseValid(torneo: Torneo) {
    if (!this.isAdmin && torneo.inscripcion_abierta === "S" && torneo.finalizado === "N" && Number(torneo.parejas_apuntadas) < Number(torneo.max_parejas) && ((torneo.genero === this.usuarioLogin.genero) || (torneo.genero === 'D'))) {
      return true;
    } else {
      return false;
    }
  }

  // Método que comprueba si el socio está apuntado al torneo
  // Recorre las parejas de ese torneo y si el id del socio está en alguna pareja está apuntado. En caso contrario no.
  isApuntado(torneo: Torneo) {
    if (torneo.parejas) {
      for (let pareja of torneo.parejas) {
        if (Number(pareja.socio1) === Number(this.usuarioLogin.id) || Number(pareja.socio2) === Number(this.usuarioLogin.id)) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  // Método que se ejecuta cuando se abre el modal de apuntarse
  abrirApuntarse(torneo: Torneo) {
    // Se obtienen los socios de BBDD
    this.socioService.obtenerSocios().subscribe(respuesta => {
      this.sociosDisponibles = respuesta;
      // Nos quedamos con los socios que no sean administrador ni Otro Socio
      this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio" && s.id !== this.usuarioLogin.id);
      // Se filtran los socios por la modalidad del torneo
      this.filtrarSociosByModalidadTorneo(torneo);
      // Si el torneo tiene ya parejas apuntadas filtro por los socios que no estén ya apuntados
      if (torneo.parejas) {
        for (let pareja of torneo.parejas) {
          this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number }) => s.id !== pareja.socio1);
          this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number }) => s.id !== pareja.socio2);
        }
      }
      // Con lo anterior limpio los socios con los que no se puede apuntar en ese momento y así solo aparecen los válidos
      this.nombresSociosApuntarse = [];
      // Creo una lista con los nombres de los socios disponibles para mostrar en el selector.
      for (let socio of this.sociosDisponibles) {
        this.nombresSociosApuntarse.push(socio.id + " - " + socio.nombre + " " + socio.apellidos + " - " + socio.dni);
      }
      // Inicializo variables necesarias
      this.torneoApuntarse = torneo;
      this.socioSeleccionado = "";
      this.displayApuntarse = true;
    });
  }

  // Método que se ejecuta cuando se abre el modal de ver inscritos. Con una llamada a BBDD se sacan los socios de las parejas apuntadas al torneo en ese momento para poder mostrarlas
  verInscritos(torneo: Torneo) {
    this.parejasTorneoService.getSociosParejaByTorneoId(torneo.id).subscribe(parejas => {
      this.torneoActual = torneo;
      this.parejasInscritas = parejas;
    });
  }

  // Método que filtra los socios en función de la modalidad del torneo y el género del socio logueado. Esto se hace para que cuando se muestran los socios disponibles para 
  // apuntarse aparezcan solo los disponibles en función del género del socio actual y la modalidad del torneo, de forma que sólo salgan los socios con los que puede jugar en ese momento.
  filtrarSociosByModalidadTorneo(torneo: Torneo) {
    if (torneo.genero === 'M') {
      this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, genero: string; }) => s.genero === 'M');
    } else if (torneo.genero === 'F') {
      this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, genero: string; }) => s.genero === 'F');
    } else if (torneo.genero === 'D') {
      if (this.usuarioLogin.genero === 'M') {
        this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, genero: string; }) => s.genero === 'F');
      } else {
        this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, genero: string; }) => s.genero === 'M');
      }
    }
  }

  // Método que se ejecuta cuando se abre el modal de cerrar torneo. Se recogen de BBDD las parejas de ese torneo y se inicializan las variables necesarias para cerrar el torneo
  cerrarTorneo(torneo: Torneo) {
    this.parejasTorneoService.getSociosParejaByTorneoId(torneo.id).subscribe(parejas => {
      this.parejasInscritas = parejas;
      this.torneoActual = torneo;
      this.parejaCampeona = null;
      this.parejaSubcampeona = null;
      this.parejasSemifinal = [];
      this.parejasCuartos = [];
      this.parejasOctavos = [];
      this.errores = [];
      this.cerrarValido = false;
    });
  }

  // Método que devuelve el texto de la modalidad según el valor guardado en BBDD
  getModalidad(genero: string) {
    switch (genero) {
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Femenino';
      case 'D':
        return 'Mixto';
      default:
        return '';
    }
  }

  // Método que con la pareja introducida devuelve los 2 nombres de los socios de la pareja
  getPareja(pareja: SocioPareja) {
    return pareja.socio1NombreCompleto + ' - ' + pareja.socio2NombreCompleto;
  }

  // Método que comprueba si es correcto cerrar torneo. También muestra mensajes de error si procede
  comprobarCerrarValido() {
    this.errores = [];
    this.cerrarValido = false;
    if (this.torneoActual) {
      const totalParejas = Number(this.torneoActual.parejas_apuntadas);
      // En función del número de parejas que haya apuntadas al torneo se comprueba que se haya introducido correctamente cada pareja
      // Se comprueba que se hayan seleccionado bien todas y que no haya parejas repetidas
      // Si hay 2 parejas se comprueba solo campeón y subcampeón
      if (totalParejas == 2) {
        if ((!this.parejaCampeona || !this.parejaSubcampeona) || (this.parejaCampeona && this.parejaSubcampeona && Number(this.parejaCampeona.id) == Number(this.parejaSubcampeona.id))) {
          // NO VALIDO
          this.errores.push("Pareja campeona y subcamepona incorrectas");
          return false;
        }
      // Si hay entre 2 y 4 se comprueban también las semifinales
      } else if (totalParejas > 2 && totalParejas <= 4) {
        if ((!this.parejaCampeona || !this.parejaSubcampeona) || this.parejasSemifinal.length != (totalParejas - 2)) {
          // NO VALIDO
          this.errores.push("Falta pareja por marcar");
          return false;
        } else if (this.comprobarParejasRepetidas()) {
          // NO VALIDO
          this.errores.push("Pareja repetida");
          return false;
        }
      // Si hay entre 4 y 8 se comprueban también los cuartos
      } else if (totalParejas > 4 && totalParejas <= 8) {
        if ((!this.parejaCampeona || !this.parejaSubcampeona) || this.parejasSemifinal.length != 2 || this.parejasCuartos.length != (totalParejas - 2)) {
          // NO VALIDO
          this.errores.push("Falta pareja por marcar");
          return false;
        } else if (this.comprobarParejasRepetidas()) {
          // NO VALIDO
          this.errores.push("Pareja repetida");
          return false;
        }
      // Si hay entre 8 y 16 se comprueban también los octavos
      } else if (totalParejas > 8 && totalParejas <= 16) {
        if ((!this.parejaCampeona || !this.parejaSubcampeona) || this.parejasSemifinal.length != 2 || this.parejasCuartos.length != 4 || this.parejasOctavos.length != (totalParejas - 2)) {
          // NO VALIDO
          this.errores.push("Falta pareja por marcar");
          return false;
        } else if (this.comprobarParejasRepetidas()) {
          // NO VALIDO
          this.errores.push("Pareja repetida");
          return false;
        }
      }
      this.cerrarValido = true;
      return true;
    }
    return false;
  }

  // Método para comprobar si se han introducido parejas repetidas al cerrar el torneo
  // Se comprueban todas las parejas introducidas y se van metiendo en un array. Antes de meter una nueva en el array se comprueba que no esté ya. Si ya está está repetida
  comprobarParejasRepetidas() {
    let idsParejas = [];
    if (this.parejaCampeona) {
      idsParejas.push(Number(this.parejaCampeona.id));
    }
    if (this.parejaSubcampeona) {
      if (!this.isIdInParejas(idsParejas, this.parejaSubcampeona.id)) {
        idsParejas.push(this.parejaSubcampeona.id);
      } else {
        return true;
      }
    }
    for (let parSemif of this.parejasSemifinal) {
      if (!this.isIdInParejas(idsParejas, parSemif.id)) {
        idsParejas.push(parSemif.id);
      } else {
        return true;
      }
    }
    for (let parCuart of this.parejasCuartos) {
      if (!this.isIdInParejas(idsParejas, parCuart.id)) {
        idsParejas.push(parCuart.id);
      } else {
        return true;
      }
    }
    for (let parOcta of this.parejasOctavos) {
      if (!this.isIdInParejas(idsParejas, parOcta.id)) {
        idsParejas.push(parOcta.id);
      } else {
        return true;
      }
    }
    return false;
  }

  // Método que devuelve si el array de ids de parejas contiene el id de la pareja introducida
  isIdInParejas(idsParejas: number[], idNuevaPareja: number) {
    return (idsParejas.includes(idNuevaPareja));
  }

  // Método que se ejecuta cuando se cierra el torneo.
  cerrar() {
    // Se cerra el modal
    this.hideModalCerrar();
    // Para cada pareja seleccionada en cada puesto se actualiza cada socio con los puntos de ese puesto del torneo
    // Campeon
    this.actualizarSocio(this.parejaCampeona.socio1Id, this.torneoActual.puntos_campeon, true);
    this.actualizarSocio(this.parejaCampeona.socio2Id, this.torneoActual.puntos_campeon, true);
    // SubCampeon
    this.actualizarSocio(this.parejaSubcampeona.socio1Id, this.torneoActual.puntos_subcampeon, false);
    this.actualizarSocio(this.parejaSubcampeona.socio2Id, this.torneoActual.puntos_subcampeon, false);
    // Semifinal
    for (let parejaSemif of this.parejasSemifinal) {
      this.actualizarSocio(parejaSemif.socio1Id, this.torneoActual.puntos_semifinal, false);
      this.actualizarSocio(parejaSemif.socio2Id, this.torneoActual.puntos_semifinal, false);
    }
    // Cuartos
    for (let parejaCuart of this.parejasCuartos) {
      this.actualizarSocio(parejaCuart.socio1Id, this.torneoActual.puntos_cuartos, false);
      this.actualizarSocio(parejaCuart.socio2Id, this.torneoActual.puntos_cuartos, false);
    }
    // Octavos
    for (let parejaOctav of this.parejasOctavos) {
      this.actualizarSocio(parejaOctav.socio1Id, this.torneoActual.puntos_octavos, false);
      this.actualizarSocio(parejaOctav.socio2Id, this.torneoActual.puntos_octavos, false);
    }
    // Se espera 1 segundo para actualizar el torneo. Se actualizan los campos finalizado e inscripción abierta y se recargan los torneos para que se aprecien los campos
    setTimeout( () => {
      this.torneoActual.finalizado = 'S';
      this.torneoActual.inscripcion_abierta = 'N';
      this.torneoservice.editarTorneo(this.torneoActual.id, this.torneoActual).subscribe(respuesta=>{
        if(respuesta){
          this.recargarTorneos();
          alert("Torneo cerrado con éxito");
        }
      });
    }, 1000);
  }

  // Método para actualizar los datos del socio una vez que se cierra el torneo. Se obtiene el socio correspondiente y se actualizan los datos de puntos y torneos jugados y ganados
  actualizarSocio(idSocio: number, puntos: number, campeon: boolean) {
    this.socioService.getSocio(idSocio).subscribe(respuesta => {
      let socio = this.getSocio(respuesta[0]);
      socio.puntos_premios = Number(socio.puntos_premios) + Number(puntos);
      socio.puntos_ranking = Number(socio.puntos_ranking) + Number(puntos);
      socio.torneos_jugados = Number(socio.torneos_jugados) + 1;
      if(campeon){
        socio.torneos_ganados = Number(socio.torneos_ganados) + 1;
      }
      this.socioService.editarSocio(idSocio, socio).subscribe(respuesta => {
      });
    });
  }

  // Método para obtener el objeto socio a través de la respuesta de BBDD
  getSocio(respuesta: Socio) {
    let socio = new Socio();
    socio.id = respuesta['id'];
    socio.nombre = respuesta['nombre'];
    socio.apellidos = respuesta['apellidos'];
    socio.dni = respuesta['dni'];
    socio.correo = respuesta['correo'];
    socio.telefono = respuesta['telefono'];
    socio.genero = respuesta['genero'];
    socio.usuario = respuesta['usuario'];
    socio.contrasenya = respuesta['contrasenya'];
    socio.puntos_premios = respuesta['puntos_premios'];
    socio.puntos_ranking = respuesta['puntos_ranking'];
    socio.torneos_jugados = respuesta['torneos_jugados'];
    socio.torneos_ganados = respuesta['torneos_ganados'];
    socio.partidos_jugados = respuesta['partidos_jugados'];
    socio.partidos_ganados = respuesta['partidos_ganados'];
    socio.premios_canjeados = respuesta['premios_canjeados'];
    socio.foto = respuesta['foto'];
    return socio;
  }

  //Método para cerrar el modal de cerrar torneo
  hideModalCerrar() {
    let modal = document.getElementById('cerrarTorneo') as HTMLElement;
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

  
  // Método que se ejecuta cuando hemos aceptamos el modal de apuntarse. Crea el objeto pareja con los datos del socio actual y el seleccionado, pregunta si está seguro
  // y con una llamada a BBDD guarda esa pareja y actualiza los datos del torneo actual
  apuntarse() {
    let pareja = new ParejaTorneo();
    pareja.torneo = Number(this.torneoApuntarse.id);
    pareja.socio1 = Number(this.usuarioLogin.id);
    const idSocio = this.socioSeleccionado.split(" - ")[0];
    pareja.socio2 = Number(idSocio);
    if (window.confirm("¿Desea apuntarse con " + this.socioSeleccionado + "?")) {
      this.parejasTorneoService.agregarPareja(pareja).subscribe(respuesta => {
        this.torneoApuntarse.parejas_apuntadas = Number(this.torneoApuntarse.parejas_apuntadas) + 1;
        this.torneoservice.editarTorneo(this.torneoApuntarse.id, this.torneoApuntarse).subscribe(respuesta => {
          this.recargarTorneos();
          this.displayApuntarse = false;
        });
      });
    }
  }

  // Método para mostrar Si o No según el valor almacenado en BBDD
  getSiNo(texto:string){
    if(texto === 'S'){
      return 'SI';
    }else{
      return 'NO';
    }
  }

  // Método para obtener la imagen correspondiente al torneo
  getImagen(torneo: Torneo) {
    return Util.URLImagenes + torneo.foto;
  }

  //Método que obtiene el icono del botón ver/editar torneo. Si está finalizado aparece el icono de ver, sino de editar
  getEditView(torneo: Torneo) {
    if(torneo.finalizado == 'S'){
      return 'visibility';
    }else{
      return 'edit';
    }
  }
}
