import { validationResult } from 'express-validator';

// Middleware para manejar errores 404
export const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware para manejo centralizado de errores
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Error específico de MongoDB - Duplicate key
  if (err.code === 11000) {
    message = 'Ya existe un registro con ese valor';
    statusCode = 400;
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(error => error.message).join(', ');
    statusCode = 400;
  }

  // Error de Cast de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    message = 'Formato de ID inválido';
    statusCode = 400;
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    message = 'Token inválido';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expirado';
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

// Middleware para validar resultados de express-validator
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors.array()
    });
  }
  
  next();
};