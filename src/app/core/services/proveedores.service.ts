import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
 import { IProveedores } from 'src/app/Interfaces/IProveedores';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private baseUrl: string = environment.baseUrl + "/usuarios";
  constructor(private http: HttpClient, private storage: StorageMap,
  ) { }

  getProveedores(): Observable<IProveedores[]> {
    return this.http
      .get<IProveedores[]>(`${this.baseUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getProveedorByID(idProveedor: number): Observable<IProveedores> {
    return this.http
      .get<IProveedores>(`${this.baseUrl}${idProveedor}/`)
      .pipe(
        retry(1),
        map((proveedor: IProveedores) => {
          console.log(proveedor);
          return proveedor;
        }),
        catchError(this.handleError));
  }

  editarProveedor(proveedor: IProveedores): Observable<IProveedores> {
    const body = JSON.stringify(proveedor);
    return this.http
      .put<IProveedores>(`${this.baseUrl}`, body)
      .pipe(
        retry(1),
        map((proveedor: IProveedores) => {
          console.log(proveedor);
          return proveedor;
        }),
        catchError(this.handleError));
  }


  public eliminarProveedor(idProveedor: number): Observable<IProveedores> {
    return this.http
      .delete<IProveedores>(`${this.baseUrl}${idProveedor}/`)
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
