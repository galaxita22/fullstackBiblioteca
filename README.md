# Sistema de Gestión de Bibliotecas

Este repositorio contiene un sistema de gestión de bibliotecas compuesto por
un backend desarrollado con Spring Boot y un frontend en Angular.

## Requisitos
- Java 17 o superior
  - Puedes descargar desde https://adoptium.net/es/download/ 
- Node.js (versión recomendada 20)
  - Puedes descargar desde https://nodejs.org/
- npm (Node Package Manager) 
  - Viene incluido con Node.js, pero puedes verificar su instalación con `npm -v`
- Maven (para el backend)
    - Puedes instalarlo siguiendo las instrucciones en https://maven.apache.org/install.html
    - Puedes usar el wrapper de Maven incluido (`./mvnw` en sistemas Unix o `mvnw.cmd` en Windows)
- Angular CLI (para el frontend)
  - Puedes instalarlo globalmente con `npm install -g @angular/cli`
- PostgreSQL (o cualquier otra base de datos compatible)

## Backend

La aplicación backend se encuentra en `SistemaGestionBibliotecas`. Para
ejecutarla localmente usa:

```bash
cd SistemaGestionBibliotecas
./mvnw spring-boot:run
```
O también puedes acceder a SistemaGestionBibliotecas con tu IDE favorito y ejecutar la clase

El servicio quedará disponible en `http://localhost:8080/`.

## Frontend

El código del frontend está en `biblio-frontend`. Para iniciar el servidor de
desarrollo ejecuta:

```bash
cd biblio-frontend
npm install
npm start
```


### Con el backend y frontend corriendo:
Abre `http://localhost:4200/` en tu navegador.

