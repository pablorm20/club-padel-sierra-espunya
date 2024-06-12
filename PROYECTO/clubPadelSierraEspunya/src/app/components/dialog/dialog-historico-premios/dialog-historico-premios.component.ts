import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Premio } from '../../../service/Premio';
import { Util } from '../../../service/Util';

@Component({
  selector: 'app-dialog-historico-premios',
  templateUrl: './dialog-historico-premios.component.html',
  styleUrl: './dialog-historico-premios.component.scss'
})
export class DialogHistoricoPremiosComponent {
  premios: any;

  constructor(public matDialogRef: MatDialogRef<DialogHistoricoPremiosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.premios = data.premios;
  }

  ngOnInit() {

  }
  getImagen(premio: Premio) {
    return Util.URLImagenes + premio.foto;
  }

  cerrar(): void {
    this.matDialogRef.close();
  }
}
