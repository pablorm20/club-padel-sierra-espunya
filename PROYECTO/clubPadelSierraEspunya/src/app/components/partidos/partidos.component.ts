import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../service/partidos.service';
import { SociosService } from '../../service/socios.service';
import { Socio } from '../../service/Socio';
import { Partido } from '../../service/Partido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.scss'
})
export class PartidosComponent implements OnInit {
  // Variables necesarias
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: Socio = new Socio();
  partidos: any;
  partidosPista1: Partido[];
  partidosPista2: Partido[];
  partidosPista3: Partido[];
  partidosPista4: Partido[];
  formularioFecha: FormGroup;
  horasValidas: string[];
  horasValidasPista1: string[];
  horasValidasPista2: string[];
  horasValidasPista3: string[];
  horasValidasPista4: string[];
  sociosDisponibles: any;
  partidoCerrar: any
  sociosPartidoCerrar: any
  socio1Cerrar: any
  socio2Cerrar: any
  socio3Cerrar: any
  socio4Cerrar: any
  errores: any;
  cerrarValido = false;
  constructor(
    private partidosService: PartidosService,
    public formulario: FormBuilder,
    private router: Router,
    private sociosService: SociosService
  ) {
    this.formularioFecha = this.formulario.group({
      fecha: ['']
    });
    // Se inicializan las variables del componente
    this.partidosPista1 = [];
    this.partidosPista2 = [];
    this.partidosPista3 = [];
    this.partidosPista4 = [];
    //this.formularioFecha.get('fecha')?.setValue(new Date());
    this.horasValidas = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
    this.horasValidasPista1 = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
    this.horasValidasPista2 = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
    this.horasValidasPista3 = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
    this.horasValidasPista4 = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
  }

  // Método ngOnInit
  ngOnInit(): void {
    // Se recoge de localStorage el usuario actual y si es admin
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage?.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      // Se asigna a la fecha actual para que nos muestre por defecto los partidos del día actual
      let fechaActual = new Date();
      this.formularioFecha.get('fecha')?.setValue(fechaActual.getFullYear() + '-' + this.getValor((fechaActual.getMonth() + 1).toString()) + '-' + this.getValor((fechaActual.getDate()).toString()));
      // Se llama al método que muestra los partidos
      this.recargarPartidos();
    }
  }

  // Método para obtener el valor correspondiente añadiendo un 0 delante si es necesario
  getValor(mes: string) {
    if (mes.length == 1) {
      return "0" + mes;
    } else {
      return mes;
    }
  }

  // Método que obtiene los partids de BBDD
  recargarPartidos() {
    this.partidosService.obtenerPartidos().subscribe(respuesta => {
      this.partidos = respuesta;
      this.partidos = this.partidos.filter((p: { id: number; }) => p.id > 0);
      // Una vez obtenidos se separan los partidos por la pista correspondiente
      this.partidosPista1 = this.partidos.filter((p: { pista: string, fecha: Date; }) => p.pista == '1' && p.fecha == this.formularioFecha.get('fecha')!.value);
      this.partidosPista2 = this.partidos.filter((p: { pista: string, fecha: Date; }) => p.pista == '2' && p.fecha == this.formularioFecha.get('fecha')!.value);
      this.partidosPista3 = this.partidos.filter((p: { pista: string, fecha: Date; }) => p.pista == '3' && p.fecha == this.formularioFecha.get('fecha')!.value);
      this.partidosPista4 = this.partidos.filter((p: { pista: string, fecha: Date; }) => p.pista == '4' && p.fecha == this.formularioFecha.get('fecha')!.value);
      // Se obtienen los socios para mostrarlos en los jugadores de los partidos. Se omiten el admin y el socio genérico
      this.sociosService.obtenerSocios().subscribe(respuesta => {
        this.sociosDisponibles = respuesta;
        this.sociosDisponibles = this.sociosDisponibles.filter((s: { id: number, nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio");
      });
      this.errores = [];
    });
  }

  // Método que borra el partido. Obtiene el partido y lo borra preguntando primero
  borrarRegistro(horaPista: string, partidos: Partido[]) {
    if (window.confirm("¿Desea borrar el registro?")) {
      let partidoHora = new Partido();
      for (let partido of partidos) {
        if (partido.hora === horaPista) {
          partidoHora = partido;
          break;
        }
      }
      this.partidosService.borrarPartido(partidoHora.id).subscribe(respuesta => {
        this.recargarPartidos();
      });
    }
  }

  // Método que nos lleva a la pantalla de edición. Obtiene el partido y nos lleva a la pantalla de edición pasando id del partido y si es o no edit.
  editarPartido(horaPista: string, partidos: Partido[], edit: string) {
    let partidoHora = new Partido();
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        partidoHora = partido;
        break;
      }
    }
    this.router.navigateByUrl('/editar-partido/' + partidoHora.id + '/' + edit);
  }

  // Método que comprueba si existe partido para esa hora
  hayPartidoHora(hora: string, partidos: Partido[]) {
    for (let partido of partidos) {
      if (partido.hora === hora) {
        return true;
      }
    }
    return false;
  }

  // Método que devuelve los socios de ese partido. Obtiene el partido de esa hora y a partir de ese partido obtiene cada uno de los socios buscando en la lista de socios.
  getSocios(horaPista: string, partidos: Partido[]) {
    let socios = [];
    let partidoHora = new Partido();
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        partidoHora = partido;
        break;
      }
    }
    let socio1 = this.sociosDisponibles.filter((s: { id: number }) => s.id == Number(partidoHora.socio1))[0];
    let socio2 = this.sociosDisponibles.filter((s: { id: number }) => s.id == Number(partidoHora.socio2))[0];
    let socio3 = this.sociosDisponibles.filter((s: { id: number }) => s.id == Number(partidoHora.socio3))[0];
    let socio4 = this.sociosDisponibles.filter((s: { id: number }) => s.id == Number(partidoHora.socio4))[0];
    socios.push(this.getNombreApellidos(socio1));
    socios.push(this.getNombreApellidos(socio2));
    socios.push(this.getNombreApellidos(socio3));
    socios.push(this.getNombreApellidos(socio4));
    return socios;
  }

  // Método que comprueba si es válido apuntarse a ese partido.
  // Obtiene el partido correspondiente por la hora y mete en un array los socios de ese partido.
  // Llamando al método hayHuecoPartido devuelve si se puede o no
  isJugarValid(horaPista: string, partidos: Partido[]) {
    let partidoHora = new Partido();
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        partidoHora = partido;
        break;
      }
    }
    let jugadores = [Number(partidoHora.socio1), Number(partidoHora.socio2), Number(partidoHora.socio3), Number(partidoHora.socio4)];
    return this.hayHuecoPartido(horaPista, jugadores);
  }

  // Método que comprueba si se puede editar ese partido.
  // Obtiene el partido correspondiente por la hora y mete en un array los socios de ese partido.
  // Llamando al método hayHuecoPartidoEditar devuelve si se puede o no
  isEditarValid(horaPista: string, partidos: Partido[]) {
    let partidoHora = new Partido();
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        partidoHora = partido;
        break;
      }
    }
    let jugadores = [Number(partidoHora.socio1), Number(partidoHora.socio2), Number(partidoHora.socio3), Number(partidoHora.socio4)];
    return this.hayHuecoPartidoEditar(horaPista, jugadores);
  }

  // Método que comprueba si se puede cerrar ese partido.
  // Obtiene el partido correspondiente por la hora y mete en un array los socios de ese partido.
  // Para cerrar el partido comprueba que el socio 1 del partido sea el actual, que el partido no esté finalizado, que estén los 4 socios necesarios y que la fecha y hora actual sean superior a la del partido.
  isCerrarValid(horaPista: string, partidos: Partido[]) {
    let partidoHora = new Partido();
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        partidoHora = partido;
        break;
      }
    }
    let fecha = new Date();
    let hora = fecha.getHours();
    let horaPartidoSeparada = partidoHora.hora.split(':');
    let fechaActual = fecha.getFullYear() + '-' + this.getValor((fecha.getMonth() + 1).toString()) + '-' + this.getValor(fecha.getDate().toString());
    let jugadores = [Number(partidoHora.socio1), Number(partidoHora.socio2), Number(partidoHora.socio3), Number(partidoHora.socio4)];
    return Number(partidoHora.socio1) == Number(this.usuarioLogin.id) && partidoHora.finalizado == 'N' && !jugadores.includes(-1) && (fechaActual > partidoHora.fecha.toString() || (hora > Number(horaPartidoSeparada[0]) && fechaActual == partidoHora.fecha.toString()));
  }

  // Método is crear valid.
  // El partido se puede crear si la fecha y hora del partido es inferior a la actual
  isCrearValid(horaPista: string) {
    let fecha = new Date();
    let hora = fecha.getHours();
    let horaPartidoSeparada = horaPista.split(':');
    let fechaActual = fecha.getFullYear() + '-' + this.getValor((fecha.getMonth() + 1).toString()) + '-' + this.getValor(fecha.getDate().toString());
    return (this.formularioFecha.get('fecha')?.value.toString() > fechaActual || (hora < Number(horaPartidoSeparada[0])) && this.formularioFecha.get('fecha')?.value.toString() == fechaActual);
  }

  // Método que a partir del partido nos devuelve hora y fecha.
  getPartidoTitulo(partidoHora: Partido) {
    return partidoHora.hora + ' / ' + partidoHora.fecha;
  }

  // Método para abrir el modal de cerrar el partido. Obtiene el partido correspondiente y recoge los socios de ese partido.
  cerrarPartido(horaPista: string, partidos: Partido[]) {
    for (let partido of partidos) {
      if (partido.hora === horaPista) {
        this.partidoCerrar = partido;
        break;
      }
    }
    this.socio1Cerrar = null;
    this.socio2Cerrar = null;
    this.socio3Cerrar = null;
    this.socio4Cerrar = null;
    this.cerrarValido = false;
    this.errores = [];
    let sociosPartido = [Number(this.partidoCerrar.socio1), Number(this.partidoCerrar.socio2), Number(this.partidoCerrar.socio3), Number(this.partidoCerrar.socio4)];
    this.sociosPartidoCerrar = this.sociosDisponibles.filter((s: { id: number }) => sociosPartido.includes(Number(s.id)));
  }

  // Método que comprueba si es válido cerra el partido.
  // Comprueba que los 4 socios estén rellenados.
  // Una vez esto comprueba que no haya ninguno repetido.
  // Si se cumple esto se puede cerrar porque está correcto a nivel de socios
  comprobarCerrarValido() {
    this.errores = [];
    this.cerrarValido = false;
    if (!this.socio1Cerrar || !this.socio2Cerrar || !this.socio3Cerrar || !this.socio4Cerrar) {
      return;
    }
    let idsSocios = [];
    idsSocios.push(this.socio1Cerrar);
    if (idsSocios.includes(this.socio2Cerrar)) {
      this.errores.push("Socio 2 repetido");
      return false;
    } else {
      idsSocios.push(this.socio2Cerrar);
    }
    if (idsSocios.includes(this.socio3Cerrar)) {
      this.errores.push("Socio 3 repetido");
      return false;
    } else {
      idsSocios.push(this.socio3Cerrar);
    }
    if (idsSocios.includes(this.socio4Cerrar)) {
      this.errores.push("Socio 4 repetido");
      return false;
    } else {
      idsSocios.push(this.socio4Cerrar);
    }
    this.cerrarValido = true;
    return;
  }

  // Método que comprueba si hay hueco en el partido
  // Comprueba que la fecha y hora del partido sean superior a la actual, que haya algún hueco y que no esté ya el socio metido en el partido
  hayHuecoPartido(horaPista: string, jugadores: number[]) {
    let fecha = new Date();
    let hora = fecha.getHours();
    let horaPartidoSeparada = horaPista.split(':');
    let fechaActual = fecha.getFullYear() + '-' + this.getValor((fecha.getMonth() + 1).toString()) + '-' + this.getValor(fecha.getDate().toString());
    return (this.formularioFecha.get('fecha')?.value.toString() > fechaActual || (hora < Number(horaPartidoSeparada[0])) && this.formularioFecha.get('fecha')?.value.toString() == fechaActual)
      && jugadores.includes(-1) && !jugadores.includes(Number(this.usuarioLogin.id));
  }
  
  // Método que comprueba si hay hueco para editar el partido
  // Comprueba que la fecha y hora del partido sean superior a la actual y que el socio actual esté en el partido. Ya que si no no se puede editar, ya que un socio puede editar un partido para quitarse a él como jugador
  hayHuecoPartidoEditar(horaPista: string, jugadores: number[]) {
    let fecha = new Date();
    let hora = fecha.getHours();
    let horaPartidoSeparada = horaPista.split(':');
    let fechaActual = fecha.getFullYear() + '-' + this.getValor((fecha.getMonth() + 1).toString()) + '-' + this.getValor(fecha.getDate().toString());
    return (this.formularioFecha.get('fecha')?.value.toString() > fechaActual || (hora < Number(horaPartidoSeparada[0])) && this.formularioFecha.get('fecha')?.value.toString() == fechaActual) && jugadores.includes(Number(this.usuarioLogin.id));
  }

  // Método que nos devuelve nombre y apellidos de un socio pasado como parámetro
  getNombreApellidos(socio: Socio) {
    if (socio) {
      return socio.nombre + " " + socio.apellidos;
    } else {
      return "Otro socio";
    }
  }

  // Método que nos lleva a la pantalla de crear un partido. Coge el valor de la fecha actual y lo pasa como parámetro junto a la hora de la pista y la pista.
  crearPartido(horaPista: string, pista: string) {
    let fecha = this.formularioFecha.get('fecha')!.value;
    this.router.navigateByUrl('/crear-partido/' + fecha + '/' + horaPista + '/' + pista);
  }

  // Método que se llama cuando se cierra el partido
  confirmarCerrarPartido() {
    // Se cierra el moda
    this.hideModalCerrar();
    // Se actualizan los 4 socios con el método actualizarSocio con el id del socio y si ha ganado o no
    // Ganadores
    this.actualizarSocio(this.socio1Cerrar, true);
    this.actualizarSocio(this.socio2Cerrar, true);
    // Perdedores
    this.actualizarSocio(this.socio3Cerrar, false);
    this.actualizarSocio(this.socio4Cerrar, false);
    setTimeout(() => {
      // Al partido se le asigna el valor S en finalizado, N en abierto y la pareja que ha ganado concatenando los ids con un -
      this.partidoCerrar.finalizado = 'S';
      this.partidoCerrar.abierto = 'N';
      this.partidoCerrar.pareja_ganadora = this.socio1Cerrar + '-' + this.socio2Cerrar;
      // Se actualiza el partido con los nuevos datos y se recargan los partidos
      this.partidosService.editarPartido(this.partidoCerrar.id, this.partidoCerrar).subscribe(respuesta => {
        if (respuesta) {
          this.recargarPartidos();
          alert("Partido cerrado con éxito");
        }
      });
    }, 3000);
  }

  // Método que actualiza un socio al cerrar un partido a través de su id y si ha sido ganador
  actualizarSocio(idSocio: number, ganador: boolean) {
    // Primero lo obtiene de BBDD
    this.sociosService.getSocio(idSocio).subscribe(respuesta => {
      // Se recupera
      let socio = this.getSocio(respuesta[0]);
      // Le suma un partido jugador
      socio.partidos_jugados = Number(socio.partidos_jugados) + 1;
      // Si ha ganado también le suma un partido ganado y 5 puntos para ranking y premios
      if (ganador) {
        socio.partidos_ganados = Number(socio.partidos_ganados) + 1;
        socio.puntos_premios = Number(socio.puntos_premios) + 5;
        socio.puntos_ranking = Number(socio.puntos_ranking) + 5;
      } else {
        // Si ha perdido solo suma 2 puntos a premios y ranking
        socio.puntos_premios = Number(socio.puntos_premios) + 2;
        socio.puntos_ranking = Number(socio.puntos_ranking) + 2;
      }
      // Se actualiza el socio
      this.sociosService.editarSocio(idSocio, socio).subscribe(respuesta => {
      });
    });
  }

  // Método que crea un objeto socio a través de la respuesta de BBDD
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

  // Método que cierra el modal de cerrar partido
  hideModalCerrar() {
    let modal = document.getElementById('cerrarPartido') as HTMLElement;
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
