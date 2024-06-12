import { Component, OnInit } from '@angular/core';
import { TorneosService } from '../../../service/torneos.service';
import { Torneo } from '../../../service/Torneo';
import { Util } from '../../../service/Util';

@Component({
  selector: 'app-torneos-inicio',
  templateUrl: './torneos-inicio.component.html',
  styleUrl: './torneos-inicio.component.scss'
})
export class TorneosInicioComponent  implements OnInit {
  // Variables necesarias
  torneos: any;
  constructor(
    private torneoservice: TorneosService,
  ) {
  }

  // Método ngOnInit que carga los torneos al inicial el componente
  ngOnInit(): void {
    this.recargarTorneos();
  }

  // Método para obtener los torneos de BBDD
  recargarTorneos() {
    this.torneoservice.obtenerTorneos().subscribe(respuesta => {
      this.torneos = respuesta;
      this.torneos = this.torneos.filter((t: { id: number; }) => t.id > 0);
    });
  }

  // Método para obtener la modalidad del torneo a través del texto de BBDD
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
  
  // Método para obtener la imagen del torneo en función de la dirección del servidor y la imagen de ese torneo
  getImagen(torneo: Torneo) {
    return Util.URLImagenes + torneo.foto;
  }
}

