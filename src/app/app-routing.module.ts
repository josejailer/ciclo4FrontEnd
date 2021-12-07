import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizatedGuard } from './core/guards/authorizated.guard';
import { ClientesComponent } from './modules/components/clientes/clientes.component';
import { ConsolidadoComponent } from './modules/components/consolidado/consolidado.component';
import { HomeComponent } from './modules/components/home/home.component';
import { LoginComponent } from './modules/components/login/login.component';
import { ProductosComponent } from './modules/components/productos/productos.component';
import { ProveedoresComponent } from './modules/components/proveedores/proveedores.component';
import { ReportesComponent } from './modules/components/reportes/reportes.component';
import { UsuariosComponent } from './modules/components/usuarios/usuarios.component';
import { VentasComponent } from './modules/components/ventas/ventas.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [AuthorizatedGuard] }
    ]
  },

  { path: 'home', component: HomeComponent , canActivate: [AuthorizatedGuard]},
  { path: 'productos', component: ProductosComponent , canActivate: [AuthorizatedGuard]},
  { path: 'proveedores', component: ProveedoresComponent , canActivate: [AuthorizatedGuard]},
  { path: 'clientes', component: ClientesComponent , canActivate: [AuthorizatedGuard]},
  { path: 'usuarios', component: UsuariosComponent , canActivate: [AuthorizatedGuard]},
  { path: 'ventas', component: VentasComponent , canActivate: [AuthorizatedGuard]},
  { path: 'consolidado', component: ConsolidadoComponent , canActivate: [AuthorizatedGuard]},
  { path: 'reportes', component: ReportesComponent , canActivate: [AuthorizatedGuard]},



  { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizatedGuard]

})
export class AppRoutingModule { }
