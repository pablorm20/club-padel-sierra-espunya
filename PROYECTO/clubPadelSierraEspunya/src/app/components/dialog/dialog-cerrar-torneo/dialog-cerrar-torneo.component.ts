import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParejasTorneosService } from '../../../service/parejas-torneo.service';
import { TorneosService } from '../../../service/torneos.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Torneo } from '../../../service/Torneo';
import { SocioPareja } from '../../../service/Socio_Pareja';

@Component({
  selector: 'app-dialog-cerrar-torneo',
  templateUrl: './dialog-cerrar-torneo.component.html',
  styleUrl: './dialog-cerrar-torneo.component.scss'
})
export class DialogCerrarTorneoComponent implements OnInit {
  campeon = new FormControl();
  subcampeon = new FormControl();
  semif1 = new FormControl();
  semif2 = new FormControl();
  filteredOptions: Observable<string[]>;
  torneo: Torneo;
  parejas: SocioPareja[];
  parejasMostrar: any;
  
  constructor(public matDialogRef: MatDialogRef<DialogCerrarTorneoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private parejasService: ParejasTorneosService, private torneoservice: TorneosService) {
    this.filteredOptions = new Observable<string[]>;
    this.torneo = data.torneo;
    this.parejas = data.parejas;
    this.parejasMostrar = [];
    for(let pareja of this.parejas){
      this.parejasMostrar.push(pareja.socio1NombreCompleto + ' / ' + pareja.socio2NombreCompleto);
    }
  }

  ngOnInit() {
    this.filteredOptions = this.campeon.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCamp(value))
      );
      this.filteredOptions = this.subcampeon.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSubCamp(value))
      );
      this.filteredOptions = this.semif1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSemif1(value))
      );
      this.filteredOptions = this.semif2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSemif2(value))
      );
  }

  private _filterCamp(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.parejasMostrar.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
  
  private _filterSubCamp(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.parejasMostrar.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
  
  private _filterSemif1(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.parejasMostrar.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
  
  private _filterSemif2(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.parejasMostrar.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
  

  cerrarTorneo(){

  }

  cerrar(): void {
    this.matDialogRef.close();
  }
}
