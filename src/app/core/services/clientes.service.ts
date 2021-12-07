import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable ,throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IClientes } from 'src/app/Interfaces/IClientes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl: string = environment.baseUrlMicroservicioClientes + "/clientes";
  constructor(private http: HttpClient, private storage: StorageMap,
  ) { }


  getClientes(): Observable<IClientes[]> {
    return this.http
      .get<IClientes[]>(`${this.baseUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getClienteByID(idUsuario:number): Observable<IClientes> {
    return this.http
      .get<IClientes>(`${this.baseUrl}/${idUsuario}`)
      .pipe(
        retry(1),
        map((cliente: IClientes) => {
          console.log(cliente);
          return cliente;
        }),
        catchError(this.handleError));
  }

  registrarCliente(iCliente: IClientes): Observable<IClientes> {
    const body = JSON.stringify(iCliente);
    console.log(body)
    return this.http
      .post<IClientes>(`${this.baseUrl}`, iCliente)
      .pipe(
        retry(1),
        map((iCliente: IClientes) => {
          console.log(iCliente);
          return iCliente;
        }),
        catchError(this.handleError));
  }

  editarCliente(cliente: IClientes): Observable<IClientes> {
    const body = JSON.stringify(cliente);
    return this.http
      .put<IClientes>(`${this.baseUrl}`, body)
      .pipe(
        retry(1),
        map((cliente: IClientes) => {
          console.log(cliente);
          return cliente;
        }),
        catchError(this.handleError));
  }


  public eliminarCliente(idCliente: number): Observable<IClientes> {
    return this.http
      .delete<IClientes>(`${this.baseUrl}/${idCliente}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  actualizarCliente(iCliente: IClientes): Observable<IClientes> {
    const body = JSON.stringify(iCliente);
    console.log(body)
    return this.http
      .post<IClientes>(`${this.baseUrl}`, iCliente)
      .pipe(
        retry(1),
        map((iCliente: IClientes) => {
          console.log(iCliente);
          return iCliente;
        }),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error);
    } else {
      console.error('An error occurred:', error.error);

    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
