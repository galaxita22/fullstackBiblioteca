import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';
  private http = inject(HttpClient);

  constructor() {}

  // 🟢 Autenticación
  loginUsuario(datosLogin: any) {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, datosLogin);
  }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/register`, datos, { responseType: 'text' });
  }

  // 📚 Libros

  // 🔍 Cliente: obtiene libros que coincidan con un término de búsqueda
  obtenerLibrosGuardados(termino: string) {
    console.log("📡 Llamando a backend con:", termino);
    return this.http.get<any[]>(`${this.baseUrl}/api/books/buscar?termino=${termino}`);
  }

  // 🧾 Cliente: obtiene todos los libros desde la base
  obtenerLibrosLocales() {
    return this.http.get<any[]>(`${this.baseUrl}/api/books/all`);
  }

  // ➕ Admin: guarda libro
  guardarLibro(libro: any, cantidadEjemplares: number) {
    const libroDTO = {
      title: libro.volumeInfo?.title || 'Sin título',
      author: libro.volumeInfo?.authors?.[0] || 'Desconocido',
      genre: libro.volumeInfo?.categories?.[0] || 'N/A',
      description: libro.volumeInfo?.description || '',
      imageUrl: libro.volumeInfo?.imageLinks?.thumbnail || '',
      cantidadEjemplares: cantidadEjemplares
    };

    return this.http.post(`${this.baseUrl}/api/books/agregar`, libroDTO);
  }

  // 🌍 Admin: buscar libros en Google Books
  buscarEnGoogleBooks(termino: string) {
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=${termino}`);
  }

  // 📦 Ejemplares
  buscarEjemplarPorCodigo(codigo: string) {
    return this.http.get<any>(`${this.baseUrl}/api/books/code/${codigo}`);
  }

  cambiarEstadoEjemplar(codigo: string, nuevoEstado: string) {
    return this.http.put(`${this.baseUrl}/api/books/code/${codigo}/estado`, nuevoEstado, { responseType: 'text' });
  }

  verificarDisponibilidad(bookId: number) {
    return this.http.get<boolean>(`${this.baseUrl}/api/books/disponible/${bookId}`);
  }

  // 🔄 Arriendos
  getMisArriendos(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/api/arriendo/usuario/${userId}`);
  }

  arrendarLibro(userId: number, codigo: string) {
    return this.http.post(
      `${this.baseUrl}/api/arriendos?userId=${userId}&codigo=${codigo}`,
      {}
    );}
  devolverArriendo(arriendoId: number) {
    return this.http.put(
      `${this.baseUrl}/api/arriendos/${arriendoId}/devolver`,
      {},
      { responseType: 'text' }
    );
  }
}
