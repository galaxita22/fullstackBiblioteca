import { Component } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-agregar-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent {
  terminoBusqueda: string = ''; // lo que se escribe en el input de búsqueda
  resultados: any[] = []; //libros encontrados
  libroSeleccionado: any = null; // libro que se selecciona para guardar
  cantidadEjemplares: number = 1; //numero de copias a guardar
  mensajeGuardado: string = ''; //mensaje de éxito o error al guardar

  constructor(private apiService: ApiService) {}

  buscarLibrosGoogle() {// función que se llama al hacer click en el botón de búsqueda, busca libros en Google Books
    if (!this.terminoBusqueda.trim()) return;// si el input está vacío no hacer nada
    this.apiService.buscarEnGoogleBooks(this.terminoBusqueda).subscribe({
      next: (res) => this.resultados = res.items || [],// si hay resultados, asignarlos al array
      error: (err) => console.error("❌ Error en búsqueda:", err)
    });
  }

  seleccionarLibro(libro: any) {// función que se llama al hacer click en un libro de los resultados, lo selecciona para guardar
    this.libroSeleccionado = libro;
    this.cantidadEjemplares = 1;//se inicializa la cantidad de ejemplares a 1
    this.mensajeGuardado = '';
  }

  confirmarGuardarLibro() {//Construye un DTO con los datos del libro y la cantidad de ejemplares, y lo manda al backend.
    if (!this.libroSeleccionado || !this.cantidadEjemplares || this.cantidadEjemplares < 1) return;

    this.apiService.guardarLibro(this.libroSeleccionado, this.cantidadEjemplares).subscribe({
      next: () => {
        this.mensajeGuardado = '✅ Libro guardado exitosamente';
        this.libroSeleccionado = null;
        this.cantidadEjemplares = 1;
      },
      error: (err) => {
        console.error('❌ Error al guardar:', err);
        this.mensajeGuardado = '❌ Error al guardar el libro';
      }
    });
  }

  cerrarModal() {//limpia los campos y cierra el modal
    this.libroSeleccionado = null;
    this.cantidadEjemplares = 1;
  }
}
