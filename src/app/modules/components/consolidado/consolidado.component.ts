import { Component, OnInit } from '@angular/core';
import { ConsolidadoService } from 'src/app/core/services/consolidado.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { VentasService } from 'src/app/core/services/ventas.service';
import { IConsolidado } from 'src/app/Interfaces/IConsolidado';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { IVentas } from 'src/app/Interfaces/IVentas';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {
  listConsolidado: Array<IConsolidado> = [];
  listConsolidadoCali: Array<IConsolidado> = [];
  listConsolidadoBogota: Array<IConsolidado> = [];
  listConsolidadoMedillin: Array<IConsolidado> = [];

  listUsuarios: Array<IUsuario> = [];
  listaVentas: Array<IVentas> = [];
  listaVentasAuxiliar: Array<IVentas> = [];
  totalVentas: number = 0;

  constructor(private consolidadoService: ConsolidadoService,
    private ventasService: VentasService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    // this.getConsolidado()
    this.getVentas();

  }

  getConsolidado() {
    this.consolidadoService.getConsolidado()
      .subscribe((resp: IConsolidado[]) => {
        this.listConsolidado = resp;
        console.log(resp)

      });
  }
  getVentas() {
    this.ventasService.getVentas().subscribe((resp: IVentas[]) => {
      this.listaVentas = resp;
      console.log(resp)
      this.getUsuarios();

    });
  }

  getUsuarios() {
    this.usuarioService.getUsuraios().subscribe((resp: IUsuario[]) => {
      this.listUsuarios = resp;
      console.log(resp)
      this.consolidado()

    });
  }
  /*    fecha_venta: string;
      ciudad_venta: string;
      total_venta: string;*/

  async consolidado() {

    this.listUsuarios.forEach(element => {
      this.listaVentas.forEach(vent => {
        if (vent.cedula_usuario === element.cedula_usuario) {
          if (element.ciudad_usuario == "Bogotá") {
            let consolidadoB: IConsolidado = {
              fecha_venta: "6/12/2021",
              ciudad_venta: element.ciudad_usuario,
              total_venta: vent.total_venta
            }
            this.listConsolidadoBogota.push(consolidadoB)
          }

          if (element.ciudad_usuario == "Cali") {
            let consolidadoC: IConsolidado = {
              fecha_venta: "6/12/2021",
              ciudad_venta: element.ciudad_usuario,
              total_venta: vent.total_venta
            }
            this.listConsolidadoCali.push(consolidadoC)
          }

          if (element.ciudad_usuario == "Medellín") {
            let consolidadoM: IConsolidado = {
              fecha_venta: "6/12/2021",
              ciudad_venta: element.ciudad_usuario,
              total_venta: vent.total_venta
            }
            this.listConsolidadoMedillin.push(consolidadoM)
          }
        }
        /* if(element.)
          let consolidado :IConsolidado = {
            fecha_venta:"6/12/2021",
            ciudad_venta: element.ciudad_usuario 
            total_venta: ;
          };*/

      });
    });
    console.log("listConsolidadoBogota", this.listConsolidadoBogota);
    console.log("listConsolidadoMedillin", this.listConsolidadoMedillin);
    console.log("listConsolidadoCali", this.listConsolidadoCali);

    await this.consolidadoBogota();
    await this.consolidadoCali();
    await this.consolidadoMedellin();
      await this.totalConsolidado().then((canvas:number) => {
      this.totalVentas=canvas
     });


    /* 
 
     this.consolidadoService.registrarConsolidado(consolidadoB).subscribe((resp: IConsolidado) => {
       console.log(resp)
     });
 
     this.consolidadoService.registrarConsolidado(consolidadoC).subscribe((resp: IConsolidado) => {
       console.log(resp)
     });*/
  }

  async consolidadoCali() {
    return new Promise((resolve, reject) => {
      if (this.listConsolidadoCali.length > 0) {
        let totalCali = 0
        var consolidadoC;
        this.listConsolidadoCali.forEach(function (a) {
          totalCali += a.total_venta;
          consolidadoC = {
            fecha_venta: "6/12/2021",
            ciudad_venta: a.ciudad_venta,
            total_venta: a.total_venta
          }
        })

        consolidadoC.total_venta = totalCali;
        this.listConsolidado.push(consolidadoC)
        console.log(consolidadoC);
      }
      resolve(this.listConsolidado);
    });
  }

  async consolidadoBogota() {

    if (this.listConsolidadoBogota.length > 0) {
      let totalBogota = 0
      var consolidadoB;
      this.listConsolidadoBogota.forEach(function (a) {
        totalBogota += a.total_venta;

        consolidadoB = {
          fecha_venta: "6/12/2021",
          ciudad_venta: a.ciudad_venta,
          total_venta: a.total_venta
        }
      })

      consolidadoB.total_venta = totalBogota;
      this.listConsolidado.push(consolidadoB)
      console.log(consolidadoB);
    }
  }

  async consolidadoMedellin() {
    if (this.listConsolidadoMedillin.length > 0) {
      let totalMedillin = 0
      var consolidadoM;
      this.listConsolidadoMedillin.forEach(function (a) {
        totalMedillin += a.total_venta;
        consolidadoM = {
          fecha_venta: "6/12/2021",
          ciudad_venta: a.ciudad_venta,
          total_venta: a.total_venta
        }
      })

      consolidadoM.total_venta = totalMedillin;
      this.listConsolidado.push(consolidadoM)
      console.log(consolidadoM);
    }
  }
  async totalConsolidado() {
    let total = 0;
    return new Promise((resolve, reject) => {
      this.listConsolidado.forEach(function (a) {
        console.log("resp", a)
        total += a.total_venta;
        /*this.consolidadoService.registrarConsolidado(a).subscribe((resp: IConsolidado) => {
          console.log(resp)
        });*/
      });
      resolve(total);
    });
  }
  /*
const array = [1, 2, 3, 4];
let sum = 0;

for (let i = 0; i < array.length; i++) {
    sum += array[i];
}
console.log(sum);

  */

}
