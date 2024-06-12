import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParejaTorneo } from './Pareja_Torneo';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con las parejas de los torneos
export class ParejasTorneosService {
  // Dirección donde se encuentra la api
  API: string='http://localhost/clubpadelsierraespunya/parejas_torneos/';
  
  constructor(private clienteHttp:HttpClient) { }
    
  // Método para obtener todos los registros de la tabla parejas_torneos
  obtenerParejas() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla parejas_torneos
  agregarPareja(datosPareja:ParejaTorneo):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosPareja);
  }

  // Método para borrar un registro en la tabla parejas_torneos
  borrarParejaTorneo(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }

  // Método para borrar los registros de la tabla parejas_torneos por el id del torneo
  borrarTodasParejasTorneo(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrarTorneo="+id);
  }

  // Método para obtener un registro de la tabla parejas_torneos por su id
  getParejaTorneo(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }
  
  // Método para obtener un registro de la tabla parejas_torneos por el id del torneo
  getParejaByTorneoId(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultarTorneo="+id);
  }

  // Método para obtener los datos de los socios de la tabla por el id del torneo
  getSociosParejaByTorneoId(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultarSocios="+id);
  }

  // Método para editar un registro de la tabla parejas_torneos
  editarParejaTorneo(id:number, datosPareja:ParejaTorneo):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosPareja);
  }
}

