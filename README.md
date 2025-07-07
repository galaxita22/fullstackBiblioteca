# fullstackBiblioteca

Este repositorio contiene un sistema de gestión de bibliotecas compuesto por
un backend desarrollado con Spring Boot y un frontend en Angular.

## Backend

La aplicación backend se encuentra en `SistemaGestionBibliotecas`. Para
ejecutarla localmente usa:

```bash
cd SistemaGestionBibliotecas
./mvnw spring-boot:run
```

El servicio quedará disponible en `http://localhost:8080/`.

## Frontend

El código del frontend está en `biblio-frontend`. Para iniciar el servidor de
desarrollo ejecuta:

```bash
cd biblio-frontend
npm install
npm start
```
Asegurate de tener instalado node.js y npm. Si no los tienes, puedes descargarlos desde:
https://nodejs.org/ (version recomendada 20).

Esto instalará las dependencias necesarias y levantará el servidor de desarrollo.


Luego abre `http://localhost:4200/` en tu navegador.

