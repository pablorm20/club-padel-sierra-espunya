import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Torneo } from '../../../service/Torneo';

@Component({
  selector: 'app-dialog-ver',
  templateUrl: './dialog-ver.component.html',
  styleUrl: './dialog-ver.component.scss'
})
export class DialogVerComponent implements OnInit {
  parejas: any;
  torneo: Torneo;

  constructor(public matDialogRef: MatDialogRef<DialogVerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.parejas = data.parejas;
    this.torneo = data.torneo;
  }

  ngOnInit() {

  }


  cerrar(): void {
    this.matDialogRef.close();
  }
}

