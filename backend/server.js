import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/database.js';
import swaggerSpec from './config/swagger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear aplicación Express
const app = express();

// ===== MIDDLEWARE DE SEGURIDAD =====

// Helmet - Configuración de headers de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS - Configuración específica para el frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting - Limitar peticiones por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por ventana
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Aplicar rate limiting a todas las rutas
app.use('/api/', limiter);

// Rate limiting más estricto para autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos de login
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión, por favor intente más tarde.'
  }
});

// ===== MIDDLEWARE GENERAL =====

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== RUTAS =====

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Portafolio Dennys Vela',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Portafolio - Documentación'
}));

// Rutas de la API
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/blog', blogRoutes);

// ===== MANEJO DE ERRORES =====

// Ruta no encontrada
app.use(notFound);

// Manejador de errores global
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Puerto: ${PORT}`);
  console.log(`✅ Documentación API: http://localhost:${PORT}/api-docs`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
