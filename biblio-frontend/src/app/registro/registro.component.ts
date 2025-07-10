import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importa RouterLink para usarlo en la plantilla

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  error: string = '';
  mensajeExito: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  registrar() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(cl|com|es|ar|)$/;
    if (!emailRegex.test(this.correo)) {
      this.error = 'Formato de correo no valido';
      return;
    }
    const datosRegistro = {
      name: this.nombre,
      email: this.correo,
      password: this.contrasena
    };

    this.apiService.registrarUsuario(datosRegistro).subscribe({
      next: (respuesta) => {
        if (respuesta.includes('exitosamente')) {
          this.mensajeExito = '¡Usuario registrado exitosamente!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.error = respuesta;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al registrar el usuario.';
      }
    });
  }
}
