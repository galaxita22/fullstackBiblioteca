import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa *ngIf
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink] //Forms y CommonModule son necesarios para usar formularios y directivas como *ngIf
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    const datosLogin = {
      email: this.correo,
      password: this.contrasena
    };

    this.apiService.loginUsuario(datosLogin).subscribe({
      next: (respuesta) => {
        let parsed;

        try {
          parsed = typeof respuesta === 'string' ? JSON.parse(respuesta) : respuesta;
        } catch (e) {
          console.error("❌ Error parseando respuesta:", e);
          this.error = 'Respuesta inválida del servidor.';
          return;
        }

        console.log("🎯 Respuesta parseada:", parsed);
        console.log("🔑 id user:", parsed.id);

        const userId = Number(parsed.id);
        const role = parsed.role;
        const email = parsed.email;

        if (!userId || !role || !email) {
          this.error = 'Datos incompletos en la respuesta.';
          return;
        }

        // 💾 Guardamos en localStorage
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);

        console.log("✅ Rol recibido:", role);
        console.log("🚀 Redirigiendo a:", role === 'admin' ? '/admin' : '/buscar');

        if (role === 'client') {
          this.router.navigate(['/buscar']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.error = 'Rol no reconocido.';
        }
      }
      ,
      error: (err) => {
        console.error(err);
        this.error = 'Invalid email or password.';
      }
    });
  }

}
