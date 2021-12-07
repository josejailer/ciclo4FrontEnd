import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private spiner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public mostrarSpiner() {
    this.spiner.show()
  }

  public ocultarSpiner() {
    this.spiner.hide()
  }

  public showSuccess(mensaje:string,titulo:string) {
    this.toastr.success(mensaje, titulo);
  }

  
}
