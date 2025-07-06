import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-arriendos',
  templateUrl: './mis-arriendos.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./mis-arriendos.component.css']
})
export class MisArriendosComponent implements OnInit {
  arriendos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getMisArriendos(Number(userId)).subscribe((data) => {
        this.arriendos = data;
      });
    }
  }
  arrendar(libro: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const ejemplarDisponible = libro.ejemplares?.find(
      (e: any) => e.estado === 'local' || e.estado === 'disponible' || e.disponible === true
    );
    if (!ejemplarDisponible) {
      alert('No hay ejemplares disponibles.');
      return;
    }

    this.apiService.arrendarLibro(Number(userId), ejemplarDisponible.codigo).subscribe({
      next: () => {
        alert('¡Libro arrendado con éxito!');
      },
      error: () => {
        alert('Error al arrendar el libro.');
      }
    });
  }

}
