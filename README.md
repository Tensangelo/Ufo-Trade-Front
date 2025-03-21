# Proyecto Frontend - Ufo Trade

Este es el frontend del proyecto **Ufo Trade** desarrollado con **Next.js 15**, **TypeScript**, **SCSS**, **Material UI**, **Axios**, **Material Icons**, y **DateJS**. Este frontend se comunica con la parte backend de **Ufo Trade**, manejando la autenticación con cookies y estructurado para ser escalable y fácil de mantener.

## Tecnologías utilizadas

- **Next.js 15**: Framework React para aplicaciones web optimizadas.
- **TypeScript**: Superset de JavaScript que agrega tipado estático.
- **SCSS**: Preprocesador CSS para escribir estilos más organizados y reutilizables.
- **Material UI**: Biblioteca de componentes React con diseño de Material Design.
- **Axios**: Cliente HTTP para hacer solicitudes a APIs.
- **Material Icons**: Biblioteca de iconos basada en Material Design.
- **DateJS**: Librería para manipular y dar formato a fechas de manera sencilla.
- **Cookies**: Utilizado para la autenticación y almacenamiento de datos importantes.

## Estructura de Carpetas

El proyecto está organizado de la siguiente manera:

- **/app**: Contiene las rutas de la aplicación, reemplazando la carpeta `pages` de Next.js.
- **/hooks**: Contiene los hooks personalizados para manejar la lógica de la aplicación.
- **/context**: Manejo del estado global y contexto de la aplicación.
- **/services**: Servicios para interactuar con la API utilizando Axios.
- **/types**: Definiciones de tipos TypeScript utilizadas en el proyecto.
- **/utils**: Funciones utilitarias como la manipulación de fechas y otras funciones generales.
- **/cookies**: Manejo de la autenticación utilizando cookies.

## 🔒 Autenticación

La autenticación se realiza mediante **JWT** (JSON Web Token) y **Cookies**:

- Al iniciar sesión, el backend genera un JWT y lo almacena en una cookie HTTPOnly.
- En cada petición autenticada, el frontend envía la cookie para validar la sesión y mantener la autenticación activa.

## ⚙️ Instalación y configuración
- Instala dependencias
- Ajusta tus variables de entorno en un archivo .env
- Ejecuta en desarrollo con __npm run dev__
- Revisar puertos de ejecucion para no tener problemas
