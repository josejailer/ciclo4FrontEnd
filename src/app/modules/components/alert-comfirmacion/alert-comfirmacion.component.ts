import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-comfirmacion',
  templateUrl: './alert-comfirmacion.component.html',
  styleUrls: ['./alert-comfirmacion.component.css']
})
export class AlertComfirmacionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<AlertComfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}
