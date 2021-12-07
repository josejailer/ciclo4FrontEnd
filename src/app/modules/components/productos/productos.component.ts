import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/core/services/productos.service';
import { IProductos } from 'src/app/Interfaces/IProductos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  cargarCsvForm: FormGroup;
  actualizarProductoForm: FormGroup;
  closeResult = '';
  modalCreacion: NgbModalRef;
  modalEdicion: NgbModalRef;
  producto: IProductos;
  listProductos: Array<IProductos> = [];
  listArray: Array<IProductos> = [];

  submitted = false;
  constructor(private productoService: ProductosService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogo: MatDialog,
    private modalService: NgbModal) {

    this.cargarCsvForm = this._formBuilder.group({
      file: ['', Validators.required],

    });
    this.actualizarProductoForm = this._formBuilder.group({
      codigo: ['', Validators.required],
      iva: ['', Validators.required],
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      precio_venta: ['', Validators.required],
      precio_compra: ['', Validators.required],

    });

  }

  ngOnInit() {

    this.listaProductos();
  }

  listaProductos() {
    this.productoService.getProductos().subscribe((resp: IProductos[]) => {
      this.listProductos = resp;
      console.log(resp)

    });
  }
  async cargarCsv() {
    console.log("valido")

    this.submitted = true;
    if (this.cargarCsvForm.valid) {
      console.log("valido")
      var input = (<HTMLInputElement>document.getElementById("cv_upload"));
      var files = input.files;
      if (files != null) {
        var len = files.length;
        if (len) {
          var datos;
          console.log("Filename: " + files[0].text);
          await files[0].text().then(function (data) {
            datos = data;
            console.log(datos)
          });
          console.log(datos)


          let csvToRowArray = datos.split('\n');
          for (let index = 0; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(";");
            console.log(row[0], row[1], row[2], row[3], row[4], row[5]);
            let datosUsuario: IProductos = {
              codigo_producto: Number(row[0]),
              iva_compra: Number(row[1]),
              nombre_producto: row[2],
              precio_compra: Number(row[3]),
              precio_venta: Number(row[4]),
              nit_proveedor: Number(row[5])
            }
           // this.listProductos.push(datosUsuario);

           this.productoService.registrarProducto(datosUsuario).subscribe((resp) => {
            console.log(resp)
            this.listaProductos();
            this.modalCreacion.close();
          });
          };
          this.toastr.success('El Archivo fue cargado exitosamente', 'Creacion de Producto!', {
            positionClass: 'toast-bottom-right'
          });
          console.log("Size: " + files[0].size + " bytes");
        }
      }

    } else {
      console.log(this.actualizarProductoForm.invalid)
    }
  }

  actualizarProducto() {
    this.submitted = true;
    console.log(this.actualizarProductoForm.invalid)

    if (this.actualizarProductoForm.valid) {
      let datosUsuario: IProductos = {
        codigo_producto: Number(this.actualizarProductoForm.value.codigo),
        iva_compra: Number(this.actualizarProductoForm.value.iva),
        nombre_producto: this.actualizarProductoForm.value.nombre,
        precio_venta: Number(this.actualizarProductoForm.value.precio_venta),
        precio_compra: Number(this.actualizarProductoForm.value.precio_compra),
        nit_proveedor: Number(this.actualizarProductoForm.value.nit),
      }
      this.productoService.actualizarProducto(datosUsuario).subscribe((resp) => {
        console.log(resp)
        this.toastr.success('El producto fue actualizado exitosamente', 'Actualización de Producto!', {
          positionClass: 'toast-bottom-right'
        });
        this.listaProductos();
        this.modalEdicion.close();
      });
    }
  }
  eliminarProducto(idProducto: any) {
    console.log(idProducto)
    if (idProducto !== undefined) {
      Swal.fire({
        title: '¿Estas seguro de eliminar este el producto?',
        text: "No podra revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.productoService.eliminarProducto(idProducto).subscribe((resp: any) => {
            console.log(resp)
            this.listaProductos();
            Swal.fire(
              'Registro eliminado!',
              'El producto fue eliminado con exito',
              'success'
            );
            this.toastr.error('El producto fue eliminado con exito', 'Registro eliminado!', {
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
  editarProducto(idProducto: any, ModalCreacionUsuario) {
    this.productoService.getProductoByID(idProducto).subscribe((resp: IProductos) => {
      console.log(resp)
      this.producto = resp;
      this.actualizarProductoForm.setValue({
        codigo: this.producto.codigo_producto,
        iva: this.producto.iva_compra,
        nombre :this.producto.nombre_producto,
        precio_venta: this.producto.precio_venta,
        nit: this.producto.nit_proveedor,
        precio_compra: this.producto.precio_compra
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
