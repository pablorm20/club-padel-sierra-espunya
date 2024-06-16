import { Component, OnInit } from '@angular/core';
import { SociosService } from '../../service/socios.service';
import { Util } from '../../service/Util';
import { Socio } from '../../service/Socio';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrl: './socios.component.scss'
})
export class SociosComponent implements OnInit {
  // Variables necesarias
  socios:any;
  public page!: number;
  constructor(
    private socioService:SociosService
  ) {}

  // Método ngOnInit
  ngOnInit(): void {
    // Se llama a BBDD para obtener todos los socios del club
    this.socioService.obtenerSocios().subscribe(respuesta=>{
      this.socios=respuesta;
      this.socios = this.socios.filter((s: { nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio");
    });
  }

  // Método para borrar un socio. Primero se pide confirmación. Si se acepta se borra el socio. 
  borrarRegistro(id:number, iControl:number){
    if(window.confirm("¿Desea borrar el registro?")){
      this.socioService.borrarSocio(id).subscribe(respuesta=>{
        this.socioService.obtenerSocios().subscribe(respuesta=>{
          this.socios=respuesta;
          this.socios = this.socios.filter((s: { nombre: string; }) => s.nombre != "Administrador" && s.nombre != "Otro Socio");
        });
      });
    }
  }

  // Método para obtener la imagen correspondiente al socio
  getImagen(socio: Socio) {
    return Util.URLImagenes + socio.foto;
  }
}
