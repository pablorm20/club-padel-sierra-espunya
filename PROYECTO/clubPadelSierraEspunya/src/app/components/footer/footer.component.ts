import { Component, OnInit } from '@angular/core';
import { Socio } from '../../service/Socio';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  isAdminS: string = "NO";
  isAdmin: boolean = false;
  usuarioLogin: any;
  // En el método ngOnInit que se ejecuta cuando se abre el componente recogemos el usuario logueado actualmente con localStorage, el cual necesitamos para mostrar unas opciones u otras del pie de página,
  // ya que dependiendo de si hay usuario logueado o no se muestran unas opciones del menú del pie u otras
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.isAdminS = localStorage?.getItem('isAdmin')!;
      this.usuarioLogin = JSON.parse(localStorage?.getItem('usuario')!);
      if (this.isAdminS === 'SI') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }
}
