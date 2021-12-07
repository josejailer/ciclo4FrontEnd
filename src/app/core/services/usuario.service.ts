import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUsuario, ResponseServerAuth } from '../../Interfaces/IUsuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageMap } from '@ngx-pwa/local-storage';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  headers = new HttpHeaders();

  private baseUrl: string = environment.baseUrlMicroserviciosProductos + "/usuarios";
  constructor(private http: HttpClient, private storage: StorageMap,

  ) {
   // this.headers.append('Content-Type', 'aplication/json');
    this.headers.append('Accept', 'application/json,text/plain');

  }

  getUsuraios(): Observable<IUsuario[]> {
    return this.http
      .get<IUsuario[]>(`${this.baseUrl}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUsurioByID(idUsuario: number): Observable<IUsuario> {
    return this.http
      .get<IUsuario>(`${this.baseUrl}/${idUsuario}/`)
      .pipe(
        retry(1),
        map((iUsuario: IUsuario) => {
          console.log(iUsuario);
          return iUsuario;
        }),
        catchError(this.handleError));
  }

  signIn(auth: IUsuario): Observable<IUsuario> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.baseUrl}/login`, auth)
        .pipe(
          map((data: any) => {
            console.log(data)
            const tmpUser = data.usuario;
            this.saveAuthSession(data).then(() => { });
            return data;
          })
        )
        .subscribe(
          (data: any) => {
            observer.next(data);
            observer.complete();
          },
          (error: any) => observer.error(error)
        );

    });
  }

  registrarUsuario(iUsuario: IUsuario): Observable<IUsuario> {
    const body = JSON.stringify(iUsuario);
    console.log(body)
    return this.http
      .post<IUsuario>(`${this.baseUrl}`, iUsuario, { headers: this.headers })
      .pipe(
        retry(1),
        map((iUsuario: IUsuario) => {
          console.log(iUsuario);
          return iUsuario;
        }),
        catchError(this.handleError));
  }

  saveAuthSession(data: ResponseServerAuth): Promise<void> {
    return new Promise((res, rej) => {
      console.log(data)
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.storage.set('currentAuthUser', data).subscribe(
        () => {
          res();
        },
        error => rej(error)
      );
    });
  }

  actualizarUsuario(iUsuario: IUsuario): Observable<IUsuario> {
    const body = JSON.stringify(iUsuario);
    return this.http
      .put<IUsuario>(`${this.baseUrl}`, iUsuario, { headers: this.headers })
      .pipe(
        retry(1),
        map((iUsuario: IUsuario) => {
          console.log(iUsuario);
          return iUsuario;
        }),
        catchError(this.handleError));
  }

  public eliminarUsuario(idUsurio: number): Observable<IUsuario> {
    return this.http
      .delete<IUsuario>(`${this.baseUrl}/${idUsurio}/`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('An error occurred:', error.error);

    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
