import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable,throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IVentas } from 'src/app/Interfaces/IVentas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUrl: string = environment.baseUrlMicroservicioVentas + "/ventas";
  constructor(private http: HttpClient, private storage: StorageMap,
  ) { }

  getVentas(): Observable<IVentas[]> {
    return this.http
      .get<IVentas[]>(`${this.baseUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getVentaByID(idVenta: number): Observable<IVentas> {
    return this.http
      .get<IVentas>(`${this.baseUrl}${idVenta}/`)
      .pipe(
        retry(1),
        map((venta: IVentas) => {
          console.log(venta);
          return venta;
        }),
        catchError(this.handleError));
  }

  editarVenta(venta: IVentas): Observable<IVentas> {
    const body = JSON.stringify(venta);
    return this.http
      .put<IVentas>(`${this.baseUrl}`, body)
      .pipe(
        retry(1),
        map((venta: IVentas) => {
          console.log(venta);
          return venta;
        }),
        catchError(this.handleError));
  }

  registrarVenta(iVentas: IVentas): Observable<IVentas> {
    const body = JSON.stringify(iVentas);
    console.log(body)
    return this.http
      .post<IVentas>(`${this.baseUrl}`, iVentas)
      .pipe(
        retry(1),
        map((iVentas: IVentas) => {
          console.log(iVentas);
          return iVentas;
        }),
        catchError(this.handleError));
  }
  public eliminarVenta(idVenta: number): Observable<IVentas> {
    return this.http
      .delete<IVentas>(`${this.baseUrl}${idVenta}/`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
