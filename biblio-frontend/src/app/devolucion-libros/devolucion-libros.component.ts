import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-devolucion-libros',
  standalone: true,
  templateUrl: './devolucion-libros.component.html',
  styleUrls: ['./devolucion-libros.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DevolucionLibrosComponent {
  codigo: string = '';
  ejemplarEncontrado: any = null;
  mensaje: string = '';
  arriendoActual: any = null;

  constructor(private apiService: ApiService) {}

  buscarEjemplar() {
    this.apiService.buscarEjemplarPorCodigo(this.codigo).subscribe({
      next: (data) => {
        this.ejemplarEncontrado = data;
        this.mensaje = '';
        if (data.arriendo) {
          this.arriendoActual = data.arriendo.find((a: any) => !a.devuelto) || null;
          console.log(this.arriendoActual);
        } else {
          this.arriendoActual = null;
          console.log(this.arriendoActual);

        }
      },
      error: () => {
        this.mensaje = 'Ejemplar no encontrado.';
        this.ejemplarEncontrado = null;
      }
    });
  }

  cambiarEstado() {
    const nuevoEstado = this.ejemplarEncontrado.estado === 'arrendado' ? 'local' : 'arrendado';

    this.apiService.cambiarEstadoEjemplar(this.codigo, nuevoEstado).subscribe({
      next: () => {
        this.ejemplarEncontrado.estado = nuevoEstado;
        this.mensaje = 'Estado actualizado correctamente.';
      },
      error: () => {
        this.mensaje = 'Error al actualizar el estado.';
      }
    });
  }
  devolver() {
    if (!this.arriendoActual) return;

    this.apiService.devolverArriendo(this.arriendoActual.codigo).subscribe({
      next: () => {
        this.arriendoActual.devuelto = true;
        this.ejemplarEncontrado.estado = 'local';
        this.mensaje = 'Libro devuelto correctamente.';
      },
      error: () => {
        this.mensaje = 'Error al devolver el libro.';
      }
    });
  }
}
