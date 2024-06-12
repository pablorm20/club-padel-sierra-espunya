import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from './Partido';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con los partidos
export class PartidosService {
  // Dirección donde se encuentra la api
  API: string='http://localhost/clubpadelsierraespunya/partidos/';
  
  constructor(private clienteHttp:HttpClient) { }

  // Método para obtener todos los registros de la tabla partidos
  obtenerPartidos() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla partidos
  agregarPartido(datosPartido:Partido):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosPartido);
  }
  
  // Método para borrar un registro de la tabla partidos
  borrarPartido(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }

  // Método para obtener un registro de la tabla partidos por su id
  getPartido(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }

  // Método para editar un registro de la tabla partidos
  editarPartido(id:number, datosPartido:Partido):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosPartido);
  }
}

