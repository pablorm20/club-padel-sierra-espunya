import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../../service/premios.service';
import { Premio } from '../../service/Premio';
import { Util } from '../../service/Util';
import { Socio } from '../../service/Socio';
import { HistoricoPremiosService } from '../../service/historico-premios.service';
import { SociosService } from '../../service/socios.service';
import { Historico_Premio } from '../../service/Historico_Premio';
import { MatDialog } from '@angular/material/dialog';
import { DialogHistoricoPremiosComponent } from '../dialog/dialog-historico-premios/dialog-historico-premios.component';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrl: './premios.component.scss'
})
export class PremiosComponent implements OnInit {
  // Variables generales
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  premios: any;
  premiosSocio: any;
  premiosSocioIds: number[];
  premiosCanjeadosSocio: Premio[];
  usuarioLogin: Socio = new Socio();
  historicoPremio: Historico_Premio = new Historico_Premio();
  public page!: number;
  constructor(
    private premioService: PremiosService,
    private historicoPremioService: HistoricoPremiosService,
    private sociosService: SociosService,
    public dialog: MatDialog,
  ) {
    this.premiosSocioIds = [];
    this.premiosCanjeadosSocio = [];
  }

  // Método ngOnInit. Se recogen de localStorage el usuario actual y si es o no admin y se cargan los premios
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage?.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.recargarPremios();
    }
  }

  // Método que obtiene los premios de BBDD para mostrarlos por pantalla. También recoge los premios correspondientes de cada socio para ver cuáles ha canjeado ya para mostrar esa infromación por pantalla.
  recargarPremios() {
    this.sociosService.getSocio(this.usuarioLogin.id).subscribe(respuesta => {
      this.usuarioLogin = respuesta[0];
      this.premioService.obtenerPremios().subscribe(respuesta => {
        this.premios = respuesta;
        this.premios = this.premios.filter((p: { id: number; }) => p.id > 0);
        this.historicoPremioService.obtenerHistoricoPremios().subscribe(respuesta => {
          this.premiosSocio = respuesta;
          this.premiosSocio = this.premiosSocio.filter((p: { socio: number; }) => Number(p.socio) === Number(this.usuarioLogin.id));
          this.premiosSocioIds = [];
          for (let premio of this.premiosSocio) {
            this.premiosSocioIds.push(premio.premio);
          }
          this.premiosCanjeadosSocio = this.premios.filter((p: { id: number; }) => this.premiosSocioIds.includes(p.id));
        });
      });
    });
  }

  // Método que se ejecuta al pulsar el botón borrar. Nos pide confirmación y si aceptamos se borra el premios seleccionado.
  borrarRegistro(id: number, iControl: number) {
    if (window.confirm("¿Desea borrar el registro?")) {
      this.premioService.borrarPremio(id).subscribe(respuesta => {
        this.premios.splice(iControl, 1);
      });
    }
  }

  // Método que se ejecuta cuando se pulsa el botón Canjear. Pregunta primeor si estamos seguros. Si aceptamos actualizamos del socio el número de premios canjeados y los puntos para premios
  // También añadimos un nuevo registro a la tabla historico_premios con los ids del premio y del socio
  canjearPremio(premio: Premio) {
    if (window.confirm("¿Está seguro de canjear el premio " + premio.nombre + " por " + premio.puntos + " puntos ?")) {
      this.usuarioLogin.puntos_premios = Number(this.usuarioLogin.puntos_premios) - Number(premio.puntos);
      this.usuarioLogin.premios_canjeados = Number(this.usuarioLogin.premios_canjeados) + 1 ;
      this.sociosService.editarSocio(this.usuarioLogin.id, this.usuarioLogin).subscribe(respuesta => {
        this.historicoPremio = new Historico_Premio();
        this.historicoPremio.premio = premio.id;
        this.historicoPremio.socio = this.usuarioLogin.id;
        this.historicoPremioService.agregarHistoricoPremio(this.historicoPremio).subscribe(respuesta => {
          this.recargarPremios();
        });
      });
    }
  }

  // Método que comprueba si el id del precio está dentro de los premios canjeados por el socio actual
  isCanjeado(premio: Premio) {
    return this.premiosSocioIds.includes(premio.id);
  }

  // Método para obtener la ruta de la imagen a mostrar del premio
  getImagen(premio: Premio) {
    return Util.URLImagenes + premio.foto;
  }

  comprobarPuntosSuficientes(premio: Premio){
    return Number(this.usuarioLogin.puntos_premios) >= Number(premio.puntos);
  }
}
