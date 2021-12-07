import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  mensajeError?: string;
  errror = false;
  subscriptionRegister!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertService: AlertService,
   // private  storageService:StorageService
    ) {

    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {


  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.mensajeError = "Todos los campos son obligatorios";
      //this.resultadoBoostrapValidation = 'NO';
      return;
    } else {
      // this.resultadoBoostrapValidation = 'SI';
      //this.alertService.mostrarSpiner();
      let datosOperador: IUsuario = {
        usuario: this.loginForm.value.nombreUsuario,
        password: this.loginForm.value.password,
      };
      console.log(JSON.stringify(datosOperador));
     
      this.usuarioService.signIn(datosOperador).subscribe((resp: IUsuario) => {
        console.log(resp);
        if (resp.cedula_usuario == 0) {
          this.mensajeError = "Usuario o contraceña incorrecto";
          this.errror = true;
        } else {
          this.alertService.showSuccess("Inicio se sesión satisfactorio!","");
          this.router.navigateByUrl('/home');
        }


      },
        (err: HttpErrorResponse) => {
          if (err.error) {
            console.log(err);
          }
          this.resolveError(err);
        }
      );
    }
  }
  resolveError(err: any) {
    let e = err.error.errors;
    console.log(err);
    if (e) {
      let keys = Object.keys(err.error.errors);
      keys.forEach((key) => {
        const control = this.loginForm.controls[key];
        if (control) {
          control.setErrors({ custom: e[key][0] });
        }
      });
    }
  }

}
