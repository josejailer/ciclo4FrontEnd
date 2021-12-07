import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { IClientes } from 'src/app/Interfaces/IClientes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  registroClienteForm: FormGroup;
  actualizarClienteForm: FormGroup;
  closeResult = '';
  modalCreacion: NgbModalRef;
  modalEdicion: NgbModalRef;
  cliente: IClientes;
  listClientes: Array<IClientes> = [];
  submitted = false;
  constructor(private clientesService: ClientesService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogo: MatDialog,
    private modalService: NgbModal) {


    this.registroClienteForm = this._formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.actualizarClienteForm = this._formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.listaClientes();
  }

  listaClientes() {
    this.clientesService.getClientes().subscribe((resp: IClientes[]) => {
      this.listClientes = resp;
      console.log(resp)

    });
  }
  agregarCliente() {
    console.log("valido")

    this.submitted = true;
    if (this.registroClienteForm.valid) {
      console.log("valido")
      let datosUsuario: IClientes = {
        cedula_cliente: Number(this.registroClienteForm.value.cedula),
        direccion_cliente: this.registroClienteForm.value.direccion,
        email_clente: this.registroClienteForm.value.email,
        nombre_cliente: this.registroClienteForm.value.nombre,
        telefono_cliente: this.registroClienteForm.value.telefono,
      }

      this.clientesService.registrarCliente(datosUsuario).subscribe((resp) => {
        console.log(resp)
        this.toastr.success('El cliente fue creado exitosamente', 'Creación de Clientes!', {
          positionClass: 'toast-bottom-right'
        });
        this.listaClientes();
        this.modalCreacion.close();
      });
    } else {
      console.log(this.registroClienteForm.invalid)
    }
  }

  actualizarCliente() {
    this.submitted = true;
    console.log(this.actualizarClienteForm.invalid)

    if (this.actualizarClienteForm.valid) {
      let datosUsuario: IClientes = {
        cedula_cliente: Number(this.actualizarClienteForm.value.cedula),
        direccion_cliente: this.actualizarClienteForm.value.direccion,
        email_clente: this.actualizarClienteForm.value.email,
        nombre_cliente: this.actualizarClienteForm.value.nombre,
        telefono_cliente: this.actualizarClienteForm.value.telefono,
      }
      this.clientesService.actualizarCliente(datosUsuario).subscribe((resp) => {
        console.log(resp)
        this.toastr.success('El cliente fue actualizado exitosamente', 'Registro Actualizado!', {
          positionClass: 'toast-bottom-right'
        });
        this.listaClientes();
        this.modalEdicion.close();
      });
    }
  }
  eliminarCliente(idUsuario: any) {
    console.log(idUsuario)
    if (idUsuario !== undefined) {
      Swal.fire({
        title: '¿Estas seguro de eliminar este el cliente?',
        text: "No podra revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.clientesService.eliminarCliente(idUsuario).subscribe((resp: any) => {
            console.log(resp)
            this.listaClientes();
            Swal.fire(
              'Registro eliminado!',
              'El cliente fue eliminado con exito',
              'success'
            );
            this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
              positionClass: 'toast-bottom-right'
            });
          });
        }
      })

    }
  }

  modalCrearUsuario(ModalCreacionUsuario) {
    this.modalCreacion = this.modalService.open(ModalCreacionUsuario, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
    this.modalCreacion.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editarCliente(idUsuario: any, ModalCreacionUsuario) {
    this.clientesService.getClienteByID(idUsuario).subscribe((resp: IClientes) => {
      console.log(resp)
      this.cliente = resp;
      this.actualizarClienteForm.setValue({
        cedula: this.cliente.cedula_cliente,
        nombre: this.cliente.nombre_cliente,
        email: this.cliente.email_clente,
        direccion: this.cliente.direccion_cliente,
        telefono: this.cliente.telefono_cliente
      })
      this.modalEdicion = this.modalService.open(ModalCreacionUsuario, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
      this.modalEdicion.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
