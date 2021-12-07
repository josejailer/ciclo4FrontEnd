import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IProductos } from 'src/app/Interfaces/IProductos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl: string = environment.baseUrlMicroserviciosProductos+"/productos"; 
  constructor(private http: HttpClient,private storage: StorageMap,
) { }
 
 getProductos(): Observable<IProductos[]> {
   return this.http
     .get<IProductos[]>(`${this.baseUrl}`)
     .pipe(
       retry(1),
       catchError(this.handleError)
      );
 }

 getProductoByID(idProducto:number): Observable<IProductos> {
  return this.http
     .get<IProductos>(`${this.baseUrl}/${idProducto}`)
     .pipe(
       retry(1),
       map((iProducto: IProductos) => {
         console.log(iProducto);
         return iProducto;
       }),
       catchError(this.handleError));
 }

 
 registrarProducto(iProducto: IProductos): Observable<IProductos> {
  const body = JSON.stringify(iProducto);
  console.log(body)
  return this.http
    .post<IProductos>(`${this.baseUrl}`, iProducto)
    .pipe(
      retry(1),
      map((iProducto: IProductos) => {
        console.log(iProducto);
        return iProducto;
      }),
      catchError(this.handleError));
}

  editarProducto(iProductos: IProductos): Observable<IProductos> {
  const body = JSON.stringify(iProductos);
  return this.http
    .put<IProductos>(`${this.baseUrl}`, body)
    .pipe(
      retry(1),
      map((iProductos: IProductos) => {
        console.log(iProductos);
        return iProductos;
      }),
      catchError(this.handleError));
}
 
 
public eliminarProducto(idUsurio:number): Observable<IProductos> {
  return this.http
    .delete<IProductos>(`${this.baseUrl}/${idUsurio}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
     );
}
actualizarProducto(iUsuario: IProductos): Observable<IProductos> {
  const body = JSON.stringify(iUsuario);
  return this.http
    .put<IProductos>(`${this.baseUrl}`, iUsuario)
    .pipe(
      retry(1),
      map((iUsuario: IProductos) => {
        console.log(iUsuario);
        return iUsuario;
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
