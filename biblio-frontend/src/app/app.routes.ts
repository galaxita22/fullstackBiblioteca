import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuscarLibrosComponent } from './buscar-libros/buscar-libros.component';
import { MisArriendosComponent } from './mis-arriendos/mis-arriendos.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './registro/registro.component';
import { DevolucionLibrosComponent } from './devolucion-libros/devolucion-libros.component';
import { AgregarLibroComponent } from './admin/agregar-libro/agregar-libro.component';
import { ReporteComponent } from './admin/reporte/reporte.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'buscar', component: BuscarLibrosComponent },
  { path: 'arriendos', component: MisArriendosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'devolucion', component: DevolucionLibrosComponent },
  { path: 'admin/agregar-libro', component: AgregarLibroComponent },
  { path: 'admin/reporte', component: ReporteComponent }
];
