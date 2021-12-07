import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { VentasService } from 'src/app/core/services/ventas.service';
import { IClientes } from 'src/app/Interfaces/IClientes';
import { IDetalleVenta } from 'src/app/Interfaces/IDetalleVenta';
import { IProductos } from 'src/app/Interfaces/IProductos';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { IVentas } from 'src/app/Interfaces/IVentas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  registroVentasForm: FormGroup;
  closeResult = '';
  modalCreacion: NgbModalRef;
  modalEdicion: NgbModalRef;
  cliente: IClientes;
  producto1: IProductos;
  producto2: IProductos;
  producto3: IProductos;
  producto: IProductos;

  detalleVenta: Array<IDetalleVenta> = [];
  listClientes: Array<IClientes> = [];
  nombreCliente: string;
  nombreProducto1?: string;
  nombreProducto2?: string;
  nombreProducto3?: string;
  valorTotalProducto1: number;
  valorTotalProducto2: number;
  valorTotalProducto3: number;
  totalVenta: number;
  totalIva: number;
  totalConIva: number;
  submitted = false;
  usuarioAuth:IUsuario;

  valoVentaProducto1: number;
  valoVentaProducto2: number;
  valoVentaProducto3: number;


  constructor(private clientesService: ClientesService,
    private _formBuilder: FormBuilder, private productoService: ProductosService,
    private toastr: ToastrService,
    public dialogo: MatDialog,
    private modalService: NgbModal,
    private ventasService: VentasService,
     private storageService:StorageService  ) {


    this.registroVentasForm = this._formBuilder.group({
      txt_cedula_cliente: ['', Validators.required],
      txt_nombre_cliente: ['', Validators.required],
      txt_cedula: ['', Validators.required],
      txt_codigo_producto1: ['', Validators.required],
      txt_nombre_producto1: ['', Validators.required],
      txt_cantidad_producto1: ['', Validators.required],
      txt_valor_total_producto1: ['', Validators.required],
      txt_codigo_producto2: ['', Validators.required],
      txt_nombre_producto2: ['', Validators.required],
      txt_cantidad_producto2: ['', Validators.required],
      txt_valor_total_producto2: ['', Validators.required],
      txt_codigo_producto3: ['', Validators.required],
      txt_nombre_producto3: ['', Validators.required],
      txt_cantidad_producto3: ['', Validators.required],
      txt_valor_total_producto3: ['', Validators.required],
      txt_total_venta: ['', Validators.required],
      txt_total_iva: ['', Validators.required],
      txt_total_con_iva: ['', Validators.required],
      txt_valor_venta_producto1: ['', Validators.required],
      txt_valor_venta_producto2: ['', Validators.required],
      txt_valor_venta_producto3: ['', Validators.required],

    });



  }

  ngOnInit() {
   this.usuarioAuth=this.storageService.loadSessionData()
  }


  agregarVenta() {
    console.log("valido")

    this.submitted = true;
    if (this.registroVentasForm.valid) {
      console.log("valido")

      let detalleVent1: IDetalleVenta = {
       // codigo_detalleventa: 1,
        cantidad_producto: Number(this.registroVentasForm.value.txt_cantidad_producto1),
        codigo_producto: Number(this.registroVentasForm.value.txt_codigo_producto1),
        //precio venta
        valor_venta: this.producto1.precio_venta,
        //precio de venta por cantidad
        valor_total: Number(this.registroVentasForm.value.txt_valor_total_producto1),
        //iva 
        valoriva:Number(this.registroVentasForm.value.txt_valor_total_producto1)- ((Number(this.registroVentasForm.value.txt_valor_total_producto1))/((this.producto1.iva_compra+100)/100)),
      }
      this.detalleVenta.push(detalleVent1);

      let detalleVent2: IDetalleVenta = {
     //   codigo_detalleventa: 2,
        cantidad_producto: Number(this.registroVentasForm.value.txt_cantidad_producto2),
        codigo_producto: Number(this.registroVentasForm.value.txt_codigo_producto2),
        valor_total: Number(this.registroVentasForm.value.txt_valor_total_producto2),
        valor_venta: Number(this.registroVentasForm.value.txt_valor_venta_producto2),
        valoriva:Number(this.registroVentasForm.value.txt_valor_total_producto2)- ((Number(this.registroVentasForm.value.txt_valor_total_producto2))/((this.producto2.iva_compra+100)/100)),
      }
      this.detalleVenta.push(detalleVent2);


      let detalleVent3: IDetalleVenta = {
        //codigo_detalleventa: 3,
        cantidad_producto: Number(this.registroVentasForm.value.txt_cantidad_producto3),
        codigo_producto: Number(this.registroVentasForm.value.txt_codigo_producto3),
        valor_total: Number(this.registroVentasForm.value.txt_valor_total_producto3),
        valor_venta: Number(this.registroVentasForm.value.txt_valor_venta_producto3),
        valoriva:Number(this.registroVentasForm.value.txt_valor_total_producto3)- ((Number(this.registroVentasForm.value.txt_valor_total_producto3))/((this.producto3.iva_compra+100)/100)),
      }

      this.detalleVenta.push(detalleVent3);

      let venta: IVentas = {
        cedula_usuario: /* Number(this.registroVentasForm.value.txt_cedula_cliente),*/  this.usuarioAuth.cedula_usuario,
        cedula_cliente: Number(this.registroVentasForm.value.txt_cedula_cliente),
       // codigo_venta: (this.registroVentasForm.value.txt_cedula_cliente),
        detalle_Venta: this.detalleVenta,
        iva_venta: Number(this.registroVentasForm.value.txt_total_iva),
        total_venta: Number(this.registroVentasForm.value.txt_total_con_iva),
        valor_venta: Number(this.registroVentasForm.value.txt_total_venta),
      }

      this.ventasService.registrarVenta(venta).subscribe((resp) => {
        console.log(venta)
        this.toastr.success('La venta fue creado exitosamente', 'Creación de Venta!', {
          positionClass: 'toast-bottom-right'
        });
      });
    } else {
      console.log(this.registroVentasForm.invalid)
    }
  }



  ConsultarCliente() {
    var input = (<HTMLInputElement>document.getElementById("txt_cedula_cliente"));
    input.value
    console.log(input.value)
    if (input.value) {
      var idUsuario = Number(input.value);
      this.clientesService.getClienteByID(idUsuario).subscribe((resp: IClientes) => {
        console.log(resp)
        if (resp) {
          this.cliente = resp;
          this.nombreCliente = this.cliente.nombre_cliente
        } else {
          Swal.fire(
            'No existe un cliente con esa cedula',
            '',
            'warning'
          );
        }
      });
    } else {
      Swal.fire(
        'Debe ingresar la cedula del cliente',
        '',
        'warning'
      );
    }
  }

  async ConsultarProducto(btnConsulta: any) {
    if (btnConsulta == "BtnObtenerProducto1") {

      var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto1"));
      this.setNombreProducto(input.value, btnConsulta);

    } else if (btnConsulta == "BtnObtenerProducto2") {

      var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto2"));
      this.setNombreProducto(input.value, btnConsulta);

    } else {

      var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto3"));
      this.setNombreProducto(input.value, btnConsulta);

    }

  }
  changeCantidadProducto1(event: any) {
    var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto1"));
    if (input.value) {
      this.productoService.getProductoByID(Number(input.value)).subscribe((resp: IProductos) => {
        this.producto1 = resp;
        if (event.target.value) {
          this.valorTotalProducto1 = this.producto1.precio_venta * event.target.value;
          console.log(this.totalVenta);
          if (this.totalVenta == undefined) {
            this.totalVenta = this.valorTotalProducto1/((this.producto1.iva_compra+100)/100);
            this.totalIva = this.valorTotalProducto1- this.totalVenta ;
            this.totalConIva =   this.valorTotalProducto1;

          } else {
            this.totalVenta = this.totalVenta + this.valorTotalProducto1/((this.producto1.iva_compra+100)/100);;
            this.totalIva = this.totalVenta ;
            this.totalConIva = this.totalVenta ;
          }

          this.totalConIva
        }
      });
    }
  }

  changeCantidadProducto2(event: any) {
    var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto2"));
    if (input.value) {
      this.productoService.getProductoByID(Number(input.value)).subscribe((resp: IProductos) => {
        this.producto2 = resp;
        if (event.target.value) {
          this.valorTotalProducto2 = this.producto2.precio_venta * event.target.value

          if (this.totalVenta == undefined) {
            this.totalVenta = this.valorTotalProducto2/((this.producto2.iva_compra+100)/100);
            this.totalIva = this.valorTotalProducto2- this.totalVenta ;
            this.totalConIva =   this.valorTotalProducto2;

          } else {
            this.totalVenta = this.totalVenta +this.valorTotalProducto2/((this.producto2.iva_compra+100)/100);;
            this.totalIva = this.valorTotalProducto2+ this.valorTotalProducto1- this.totalVenta ;;
            this.totalConIva = this.valorTotalProducto1+ this.valorTotalProducto2;
          }
        }
      });
    }
  }

  changeCantidadProducto3(event: any) {
    var input = (<HTMLInputElement>document.getElementById("txt_codigo_producto3"));
    if (input.value) {
      this.productoService.getProductoByID(Number(input.value)).subscribe((resp: IProductos) => {
        this.producto3 = resp;
        if (event.target.value) {
          this.valorTotalProducto3 = this.producto3.precio_venta * event.target.value
          if (this.totalVenta == undefined) {
            this.totalVenta = this.valorTotalProducto3/((this.producto3.iva_compra+100)/100);
            this.totalIva = this.valorTotalProducto3- this.totalVenta ;
            this.totalConIva =   this.valorTotalProducto3;

          } else {
            this.totalVenta = this.totalVenta + this.valorTotalProducto3/((this.producto3.iva_compra+100)/100);;
            this.totalIva =this.valorTotalProducto3+this.valorTotalProducto2+this.valorTotalProducto1- this.totalVenta ;
            this.totalConIva = this.valorTotalProducto1+ this.valorTotalProducto2+this.valorTotalProducto3;
          }
        }
      });
    }
  }
  setNombreProducto(idProducto: any, btnConsulta: string) {
    console.log(idProducto)
    if (idProducto) {
      this.productoService.getProductoByID(Number(idProducto)).subscribe((resp: IProductos) => {
        console.log(resp)
        if (resp) {
          this.producto = resp;
          if (btnConsulta == "BtnObtenerProducto1") {
            this.nombreProducto1 = this.producto.nombre_producto
            this.valoVentaProducto1=this.producto.precio_venta
          } else if (btnConsulta == "BtnObtenerProducto2") {
            this.nombreProducto2 = this.producto.nombre_producto
            this.valoVentaProducto2=this.producto.precio_venta

          } else {
            this.nombreProducto3 = this.producto.nombre_producto
            this.valoVentaProducto3=this.producto.precio_venta

          }

        } else {
          Swal.fire(
            'No existe un producto con ese codigo',
            '',
            'warning'
          );
          if (btnConsulta == "BtnObtenerProducto1") {
            this.nombreProducto1 = ""

          } else if (btnConsulta == "BtnObtenerProducto2") {
            this.nombreProducto2 = ""
          } else {
            this.nombreProducto3 = ""
          }
        }

      });
    } else {
      Swal.fire(
        'Debe ingresar el codigo del producto',
        '',
        'warning'
      );
    }

  }

}
