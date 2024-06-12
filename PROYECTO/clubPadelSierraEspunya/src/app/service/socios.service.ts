import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socio } from './Socio';
@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con los socios
export class SociosService {
  // Dirección donde se encuentra la api
  API: string='http://localhost/clubpadelsierraespunya/socios/';
  
  constructor(private clienteHttp:HttpClient) { }

  // Método para obtener todos los registros de la tabla socios
  obtenerSocios() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla socios
  agregarSocio(datosSocio:Socio):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosSocio);
  }

  // Método para borrar un registro de la tabla socios
  borrarSocio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }

  // Método para obtener un registro de la tabla socios por su id
  getSocio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }

  // Método para obtener el socio a través el usuario
  getUsuario(usuario:String):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultarUsuario="+usuario);
  }

  // Método para editar un registro de la tabla socios
  editarSocio(id:number, datosSocio:Socio):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosSocio);
  }
}
