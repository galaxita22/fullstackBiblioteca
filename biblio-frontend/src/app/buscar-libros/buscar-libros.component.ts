import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { groupBooksByTitle } from '../utils/book-utils';
import { Router } from '@angular/router';
import { MisArriendosComponent } from '../mis-arriendos/mis-arriendos.component';
import { MisMultasComponent } from '../mis-multas/mis-multas.component';

@Component({
  selector: 'app-buscar-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, MisArriendosComponent, MisMultasComponent],
  templateUrl: './buscar-libros.component.html',
  styleUrls: ['./buscar-libros.component.css']
})
//Este componente permite a los usuarios buscar libros guardados en la base de datos y arrendarlos si están disponibles.
export class BuscarLibrosComponent implements OnInit {
  books: any[] = [];
  terminoBusqueda = '';
  rolUsuario: string | null = '';
  userId: string | null = '';
  seccion: 'buscar' | 'misArriendos' | 'misMultas' = 'buscar';
  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    console.log("🔑 id user:", this.userId);//debug para ver por qué no toma el id

    if (this.rolUsuario === 'client') {
      this.apiService.obtenerLibrosLocales().subscribe({
        next: (data) => {
          this.books = groupBooksByTitle(data);
          console.log("📚 Libros cargados desde backend:", this.books);
        },
        error: () => {
          console.error("Error al cargar libros guardados");
        }
      });

    }
  }

  buscar(event: Event): void {
    event.preventDefault(); // ← ¡bloquea redirección a /buscar!

    console.log("🧠 El formulario fue enviado con:", this.terminoBusqueda);

    if (!this.terminoBusqueda.trim()) {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }

    if (this.rolUsuario === 'client') {
      this.apiService.obtenerLibrosGuardados(this.terminoBusqueda).subscribe({
        next: (respuesta) => {
          console.log("✅ Libros encontrados:", respuesta);
          this.books = groupBooksByTitle(respuesta);
        },
        error: () => {
          console.error('Error al buscar libros en la base de datos');
        }
      });
    }
  }


  arrendar(libro: any): void {
    if (!this.userId) {
      alert('Debes iniciar sesión.');
      return;
    }
    console.log(libro);
    const ejemplarDisponible = libro.ejemplares?.find(
      (e: any) => e.estado === 'local' || e.estado === 'disponible' || e.disponible === true
    );
    console.log("📘 libro recibido al arrendar:", libro);

    if (!ejemplarDisponible) {
      alert('No hay ejemplares disponibles.');
      return;
    }

    this.apiService.arrendarLibro(Number(this.userId), ejemplarDisponible.codigo).subscribe({
        next: () => {
          alert(`Arrendaste "${libro.title}" con éxito 🥳📖`);
          ejemplarDisponible.estado = 'arrendado';
          ejemplarDisponible.disponible = false;
          if (libro.disponibles != undefined && libro.disponibles > 0) {
            libro.disponibles -= 1;
          }
        },
        error: () => {
          alert('Ocurrió un error al arrendar el libro AAAAAA.');
          console.log(libro.disponibles, Number(this.userId), ejemplarDisponible.id)
        }
      });

  }
  esDisponible(libro: any): boolean {
    return (
      libro.ejemplares?.some(
        (e: any) => e.estado === 'local' || e.estado === 'disponible' || e.disponible === true
      ) ?? false
    );  }

  setSeccion(seccion: 'buscar' | 'misArriendos' | 'misMultas'): void {
    this.seccion = seccion;
  }
}
