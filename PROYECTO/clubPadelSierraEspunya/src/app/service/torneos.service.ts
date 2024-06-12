import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from './Torneo';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con los torneos
export class TorneosService {
  API: string='http://localhost/clubpadelsierraespunya/torneos/';
  
  constructor(private clienteHttp:HttpClient) { }
  
  // Método para obtener todos los registros de la tabla torneos
  obtenerTorneos() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla torneos
  agregarTorneo(datosTorneo:Torneo):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosTorneo);
  }

  // Método para borrar un registro de la tabla torneos
  borrarTorneo(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }

  // Método para obtener un registro de la tabla torneos por su id
  getTorneo(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }

  // Método para editar un registro de la tabla torneos
  editarTorneo(id:number, datosTorneo:Torneo):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosTorneo);
  }
}
