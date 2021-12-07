import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import Swal from 'sweetalert2';
import { AlertComfirmacionComponent } from '../alert-comfirmacion/alert-comfirmacion.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  registroUsuarioForm: FormGroup;
  actualizarUsuarioForm: FormGroup;
  closeResult = '';
  modalCreacion: NgbModalRef;
  modalEdicion: NgbModalRef;
  usuario: IUsuario;
  listUsuarios: Array<IUsuario> = [];
  submitted = false;
  constructor(private usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogo: MatDialog,
    private modalService: NgbModal) {

    this.registroUsuarioForm = this._formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.actualizarUsuarioForm = this._formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.listaUsuarios();
  }

  listaUsuarios() {
    this.usuarioService.getUsuraios().subscribe((resp: IUsuario[]) => {
      this.listUsuarios = resp;

    });
  }
  agregarUsuario() {
    this.submitted = true;
    if (this.registroUsuarioForm.valid) {
      console.log("valido")
      let datosUsuario: IUsuario = {
        cedula_usuario: Number(this.registroUsuarioForm.value.cedula),
        nombre_usuario: this.registroUsuarioForm.value.nombre,
        email_usuario: this.registroUsuarioForm.value.email,
        usuario: this.registroUsuarioForm.value.usuario,
        password: this.registroUsuarioForm.value.password,
      }
      this.usuarioService.registrarUsuario(datosUsuario).subscribe((resp) => {
        console.log(resp)
        this.toastr.success('El usuario fue creado exitosamente', 'Creación de Usuarios!', {
          positionClass: 'toast-bottom-right'
        });
        this.listaUsuarios();
        this.modalCreacion.close();
      });
    } else {
      console.log(this.registroUsuarioForm.invalid)
    }
  }

  actualizarUsuario() {
    this.submitted = true;
    console.log(this.actualizarUsuarioForm.invalid)

    if (this.actualizarUsuarioForm.valid) {
      let datosUsuario: IUsuario = {
        cedula_usuario: Number(this.actualizarUsuarioForm.value.cedula),
        nombre_usuario: this.actualizarUsuarioForm.value.nombre,
        email_usuario: this.actualizarUsuarioForm.value.email,
        usuario: this.actualizarUsuarioForm.value.usuario,
        password: this.actualizarUsuarioForm.value.password,
      }
      this.usuarioService.actualizarUsuario(datosUsuario).subscribe((resp) => {
        console.log(resp)
        this.toastr.success('El usuario fue actualizado exitosamente', 'Registro Actualizado!', {
          positionClass: 'toast-bottom-right'
        });
        this.listaUsuarios();
        this.modalEdicion.close();
      });
    }
  }
  eliminarUsuario(idUsuario: any) {
    console.log(idUsuario)
    if (idUsuario !== undefined) {
      Swal.fire({
        title: '¿Estas seguro de eliminar este el usuario?',
        text: "No podra revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(idUsuario).subscribe((resp: any) => {
            console.log(resp)
            this.listaUsuarios();
            Swal.fire(
              'Registro eliminado!',
              'El usuario fue eliminado con exito',
              'success'
            );
            this.toastr.error('El usuario fue eliminado con exito', 'Registro eliminado!', {
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

  editarUsuario(idUsuario: any, ModalCreacionUsuario) {
    this.usuarioService.getUsurioByID(idUsuario).subscribe((resp:IUsuario) => {
      console.log(resp)
      this.usuario = resp;
      this.actualizarUsuarioForm.setValue({
        cedula:  this.usuario.cedula_usuario,
        nombre:  this.usuario.nombre_usuario,
        email:  this.usuario.email_usuario,
        usuario:  this.usuario.usuario,
        password:  this.usuario.password
      })
      this.modalEdicion=this.modalService.open(ModalCreacionUsuario, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
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
