Portafolio Web – Dennys Vela

Portafolio web full stack con panel de administración y blog técnico.
Incluye frontend, backend y base de datos conectados y desplegados en la nube.

1. Funcionalidades del portafolio

El proyecto incluye:

Hoja de vida:

Experiencia laboral

Estudios

Habilidades

Información de contacto

Blog técnico:

4 posts (2 iniciales + 2 nuevos)

Interfaz de administración:

Login con usuario y contraseña

Edición de datos del perfil

Creación y edición de posts

Rutas protegidas para administración

Diseño responsive y accesible

Comunicación frontend–backend mediante API REST

2. Tecnologías utilizadas y justificación
Frontend

React + Vite

Vite permite un entorno de desarrollo más rápido que CRA.

React facilita la creación de componentes reutilizables.

Tailwind CSS

Estilos rápidos, consistentes y responsive sin escribir CSS complejo.

React Router

Manejo de navegación entre páginas.

Axios

Manejo sencillo y ordenado de peticiones HTTP.

Hooks (useState, useEffect)

Manejo de estado y efectos secundarios.

Justificación:
React es ideal para aplicaciones SPA, Vite mejora el rendimiento en desarrollo y Tailwind acelera el diseño responsive.

Backend

Node.js + Express.js

Framework ligero y flexible para crear APIs REST.

express-validator

Validación de datos en todas las rutas.

Middlewares de seguridad:

Helmet

cors configurado

express-rate-limit

JWT

Autenticación segura para el panel de administración.

Manejo centralizado de errores

Justificación:
Express es sencillo, ampliamente usado y se integra perfectamente con MongoDB y JWT.

Base de datos

MongoDB Atlas + Mongoose

¿Por qué NoSQL?

Estructura flexible para perfiles y posts.

Fácil escalabilidad.

Ideal para proyectos tipo portafolio y blogs.

3. Ejecución local del proyecto
Requisitos previos

Node.js v18+

Git

Cuenta en MongoDB Atlas

Clonar repositorios
git clone https://github.com/tu-usuario/portafolio-backend.git
git clone https://github.com/tu-usuario/portafolio-frontend.git

Backend (local)
cd backend
npm install


Crear archivo .env:

PORT=5000
NODE_ENV=development
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=Admin123!


Ejecutar:

npm run dev


Servidor en:

http://localhost:5000

Frontend (local)
cd frontend
npm install


Crear archivo .env:

VITE_API_URL=http://localhost:5000


Ejecutar:

npm run dev


Frontend en:

http://localhost:5173

4. Autenticación

Login con usuario y contraseña

Contraseñas protegidas

Rutas de administración protegidas con JWT

Acceso solo para usuarios autorizados

5. Seguridad implementada

Hash de contraseñas

Protección contra XSS e inyecciones

Variables de entorno para secretos

CORS restringido al dominio del frontend

Rate limiting

Helmet para headers de seguridad

6. Despliegue
Base de datos

MongoDB Atlas (Cluster gratuito M0)

Backend

Render

Frontend

Vercel

7. Enlaces del proyecto (funcionales)
Frontend

Render:
https://portafolio-web-dennys-vela.onrender.com/

Vercel:
https://portafolio-web-dennys-vela.vercel.app/

Backend / API

Render:
https://portafolio-backend.onrender.com

Base de datos

MongoDB Atlas:
https://cloud.mongodb.com/v2/697ac43f16db44312ae78b2f#/explorer/697ac487682a9067271aee26/portafolio/users/find

8. Resultado final

Frontend desplegado y accesible

Backend funcionando y protegido

Base de datos conectada

Panel de administración operativo

Proyecto completo y en producción
