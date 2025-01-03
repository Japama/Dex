# Pokemon App

## Descripción

Este proyecto consiste en una aplicación web de visualización de Pokémon, desarrollada utilizando tecnologías modernas de frontend y backend. La aplicación permite a los usuarios explorar información sobre diferentes Pokémon.

### Backend

El backend está implementado con Node.js y Express, ofreciendo una API REST. Se han integrado dos sistemas de bases de datos: MongoDB y MySQL. Esto proporciona flexibilidad en la gestión de datos y demuestra la capacidad de trabajar con diferentes tecnologías de base de datos.

### Frontend

El frontend está desarrollado con React en JavaScript y estilizado con SASS. Se ha utilizado React Router para la navegación entre páginas. La aplicación incluye animaciones interactivas, como efectos al pasar el cursor sobre los Pokémon en el listado y una animación de "respiración" en la página de detalles de cada Pokémon. Al hacer clic en un Pokémon, la tarjeta correspondiente se amplía para crear una transición fluida a la página de detalles.

El diseño gráfico de la aplicación es moderno y atractivo, con una interfaz intuitiva que facilita la navegación y la interacción del usuario. Se han incorporado mejoras como la posibilidad de elegir entre bases de datos (MongoDB o MySQL) y el tipo de filtrado (por JS o en base de datos). Se han añadido toques de color y animaciones para mejorar la experiencia visual del usuario.

## Instrucciones para Iniciar los Proyectos

### Usando Docker

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Clona el repositorio.
3. Navega a la carpeta del proyecto.
4. Copia los archivos `.env.example` a `.env` y configura las variables de entorno según tus necesidades.
   ```sh
   cp back/.env.example back/.env
   cp front/.env.example front/.env
   ```
5. Ejecuta `docker-compose up -d` para levantar los contenedores.
6. La API estará disponible en `http://localhost:3003` y la interfaz en `http://localhost:3000`.

### Backend

1. Navega a la carpeta `back` del repositorio.
2. Cambia el nombre del archivo `.env.example` a `.env` y configura las variables de entorno según tus necesidades.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.
4. Inicia el servidor con `npm start`.
5. La API estará disponible en `http://localhost:3003`.

### Frontend

1. Accede a la carpeta `front` del repositorio.
2. Cambia el nombre del archivo `.env.example` a `.env` y configura las variables de entorno según tus necesidades.
3. Ejecuta `npm install` para instalar las dependencias necesarias.
4. Inicia la aplicación con `npm start`.
5. El navegador se abrirá automáticamente mostrando la interfaz en `http://localhost:3000`.

## Características Adicionales

- **Flags de Configuración**: La aplicación permite seleccionar el tipo de base de datos y el método de filtrado a través de la interfaz.
- **Animaciones Interactivas**: Efectos visuales que enriquecen la experiencia del usuario al interactuar con la lista de Pokémon.
- **Transiciones Suaves**: Las transiciones entre la vista de lista y los detalles de cada Pokémon están diseñadas para ser fluidas y atractivas.

---

Disfruta explorando el mundo de Pokémon con esta aplicación interactiva y visualmente atractiva.
