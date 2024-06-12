import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Premio } from './Premio';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con los premios
export class PremiosService {
  // Dirección donde se encuentra la api
  API: string='http://localhost/clubpadelsierraespunya/premios/';
  
  constructor(private clienteHttp:HttpClient) { }

  // Método para obtener todos los registros de la tabla premios
  obtenerPremios() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla premios
  agregarPremio(datosPremio:Premio):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosPremio);
  }

  // Método para borrar un registro de la tabla premios
  borrarPremio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }

  // Método para obtener un registro de la tabla premios por su id
  getPremio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }

  // Método para editar un registro de la tabla premios
  editarPremio(id:number, datosPremio:Premio):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosPremio);
  }
}

