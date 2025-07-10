import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevolucionLibrosComponent } from '../devolucion-libros/devolucion-libros.component';
import {BuscarLibrosComponent} from '../buscar-libros/buscar-libros.component';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import {AgregarLibroComponent} from './agregar-libro/agregar-libro.component';
import {ReporteComponent} from './reporte/reporte.component';
import { groupBooksByTitle } from '../utils/book-utils';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, DevolucionLibrosComponent, AgregarLibroComponent, ReporteComponent]
})
export class AdminComponent {
  seccion: string = '';
  books: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}
  cargarLibros() {
    this.apiService.obtenerLibrosLocales().subscribe(libros => {
      this.books = groupBooksByTitle(libros);
    });
  }
  setSeccion(nombre: string) {
    this.seccion = nombre;
    if (nombre === 'verLibros') {
      this.cargarLibros();
    }
  }
  irAgregarLibro() {
    this.router.navigate(['/admin/agregar-libro']);
  }

  ngOnInit() {
    const rol = localStorage.getItem('role');
    if (rol !== 'admin') {
      this.router.navigate(['/buscar']);
    }
  }




}
