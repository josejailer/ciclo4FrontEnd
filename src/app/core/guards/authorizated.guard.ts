import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router,
    ) { }
 
       async canActivate(next: ActivatedRouteSnapshot) {
        if (localStorage.getItem('currentUser')) {
          console.log("sssssssss")
          if (next.routeConfig?.path === 'login' || next.routeConfig?.path === '') {
            this.router.navigateByUrl('/home');
            return false;
          } else {
            return true;
          }
        } else {
          if (next.routeConfig?.path === 'login' || next.routeConfig?.path === '') {
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        }
      }
}
