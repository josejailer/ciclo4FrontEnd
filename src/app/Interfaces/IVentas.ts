import { IDetalleVenta } from "./IDetalleVenta";
 
export interface IVentas {
      cedula_usuario?:number;
       cedula_cliente:number;
       codigo_venta?:string;
       detalle_Venta?:IDetalleVenta[];
       iva_venta:number;
       total_venta:number;
       valor_venta:number;
 
}