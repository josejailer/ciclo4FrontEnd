/**
 * Created by xavi on 5/16/17.
 */
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { IUsuario } from "src/app/Interfaces/IUsuario";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

   private currentSession: IUsuario;

  constructor(private router: Router) {
     //this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: IUsuario): void {
    this.currentSession = session;
     localStorage.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): IUsuario {
    var sessionStr =  localStorage.getItem('currentUser')  ;
    console.log(sessionStr);
    if(sessionStr){
      return  <IUsuario> JSON.parse(sessionStr) ;
    }else{
      return (sessionStr) as IUsuario ;

    }
  }

  getCurrentSession(): IUsuario {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    localStorage.removeItem('currentUser');
   // this.currentSession = null;
  }

  getCurrentUser() {

  };
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    //this.currentITokenSubject.next(null);
  }
  //isAuthenticated():  {
   // return (this.getCurrentToken() != null) ? true : false;
 // };

 /* getCurrentToken(): string {
    var session = this.getCurrentSession();
    return session.token as string;
  };*/
/*
  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }*/

}
