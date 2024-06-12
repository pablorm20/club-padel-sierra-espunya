import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Servicio que contiene todas las acciones relacionadas con la subida de imagenes al servidor
export class ImagenesService {
  public url: string;
  constructor(private http: HttpClient) {
    // Dirección donde se encuentra la api
    this.url = "http://localhost/clubpadelsierraespunya/imagenes/"
   }

   // Método para subir una imagen al servidor
   uploadFile(archivo: any) :Observable<any>{
    return this.http.post(`${this.url}subirArchivo.php`, JSON.stringify(archivo));
  }
}
