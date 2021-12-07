import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './modules/components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './core/services/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './modules/components/home/home.component';
import { ProductosComponent } from './modules/components/productos/productos.component';
import { ProveedoresComponent } from './modules/components/proveedores/proveedores.component';
import { ClientesComponent } from './modules/components/clientes/clientes.component';
import { UsuariosComponent } from './modules/components/usuarios/usuarios.component';
import { VentasComponent } from './modules/components/ventas/ventas.component';
import { AlertComfirmacionComponent } from './modules/components/alert-comfirmacion/alert-comfirmacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsolidadoComponent } from './modules/components/consolidado/consolidado.component';
import { ReportesComponent } from './modules/components/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProductosComponent,
    ProveedoresComponent,
    ClientesComponent,
    UsuariosComponent,
    VentasComponent,
    AlertComfirmacionComponent,
    ConsolidadoComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    MaterialModule, NgbModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
