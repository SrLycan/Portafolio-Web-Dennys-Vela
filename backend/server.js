import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/database.js';
import swaggerSpec from './config/swagger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import blogRoutes from './routes/blogRoutes.js';


dotenv.config();


connectDB();

const app = express();




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

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});


app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión, por favor intente más tarde.'
  }
});


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Portafolio Dennys Vela',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Portafolio - Documentación'
}));


app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/blog', blogRoutes);


app.use(notFound);


app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Puerto: ${PORT}`);
  console.log(`✅ Documentación API: http://localhost:${PORT}/api-docs`);
});


process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
