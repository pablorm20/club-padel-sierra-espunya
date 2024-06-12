import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Socio } from '../../../service/Socio';
import { Torneo } from '../../../service/Torneo';
import { ParejasTorneosService } from '../../../service/parejas-torneo.service';
import { ParejaTorneo } from '../../../service/Pareja_Torneo';
import { TorneosService } from '../../../service/torneos.service';

@Component({
  selector: 'app-dialog-apuntarse',
  templateUrl: './dialog-apuntarse.component.html',
  styleUrl: './dialog-apuntarse.component.scss'
})
export class DialogApuntarseComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  torneo: Torneo;
  socioActual: number;

  constructor(public matDialogRef: MatDialogRef<DialogApuntarseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private parejasService: ParejasTorneosService, private torneoservice: TorneosService) {
    this.filteredOptions = new Observable<string[]>;
    this.torneo = data.torneo;
    this.socioActual = data.socioActual;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.data.sociosDisponiblesPareja.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  apuntarse() {
    let pareja = new ParejaTorneo();
    pareja.torneo = Number(this.torneo.id);
    pareja.socio1 = Number(this.socioActual);
    const idSocio = this.myControl.value.split(" - ")[0];
    pareja.socio2 = Number(idSocio);
    if (window.confirm("¿Desea apuntarse con " + this.myControl.value + "?")) {
      this.parejasService.agregarPareja(pareja).subscribe(respuesta => {
        this.torneo.parejas_apuntadas = Number(this.torneo.parejas_apuntadas) + 1;
        this.torneoservice.editarTorneo(this.torneo.id, this.torneo).subscribe(respuesta => {
          this.matDialogRef.close();
        });
      });
    }
  }

  cerrar(): void {
    this.matDialogRef.close();
  }
}
