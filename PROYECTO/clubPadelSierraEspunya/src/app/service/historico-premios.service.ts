import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historico_Premio } from './Historico_Premio';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con los premios canjeados por cada socio
export class HistoricoPremiosService {
  // Dirección donde se encuentra la api
  API: string='http://localhost/clubpadelsierraespunya/historico_premios/';
  
  constructor(private clienteHttp:HttpClient) { }

  // Método para obtener todos los premios de la tabla historico_premios
  obtenerHistoricoPremios() {
    return this.clienteHttp.get(this.API);
  }

  // Método para crear un nuevo registro en la tabla historico_premios
  agregarHistoricoPremio(datosPremio:Historico_Premio):Observable<any>{
    return this.clienteHttp.post(this.API + "?insertar=1", datosPremio);
  }

  // Método para borrar un registro de la tabla historico_premios
  borrarHistoricoPremio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrar="+id);
  }
  
  // Método para borrar un registro de la tabla historico_premios por id del premio
  borrarHistoricoPremioByPremioId(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?borrarPremio="+id);
  }

  // Método para obtener un registro de la tabla historico_premios por su id
  getHistoricoPremio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultar="+id);
  }

  // Método para editar un registro de la tabla historico_premios
  editarHistoricoPremio(id:number, datosPremio:Historico_Premio):Observable<any>{
    return this.clienteHttp.post(this.API + "?actualizar="+id, datosPremio);
  }

  // Método para obtener los registros de la tabla historico_premios por el id del socio
  getPremiosBySocio(id:number):Observable<any>{
    return this.clienteHttp.get(this.API + "?consultarSocio="+id);
  }

}
