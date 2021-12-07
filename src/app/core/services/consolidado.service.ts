import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IConsolidado } from 'src/app/Interfaces/IConsolidado';
 import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadoService {
  private baseUrl: string = environment.baseUrlMicroservicioConsolidado + "/consolidado/";
  constructor(private http: HttpClient 
  ) { }

  getConsolidado(): Observable<IConsolidado[]> {
    return this.http
      .get<IConsolidado[]>(`${this.baseUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
       );
  }

   
 registrarConsolidado(iProducto: IConsolidado): Observable<IConsolidado> {
  const body = JSON.stringify(iProducto);
  console.log(body)
  return this.http
    .post<IConsolidado>(`${this.baseUrl}`, iProducto)
    .pipe(
      retry(1),
      map((iProducto: IConsolidado) => {
        console.log(iProducto);
        return iProducto;
      }),
      catchError(this.handleError));
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
