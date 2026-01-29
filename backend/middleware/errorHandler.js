import { validationResult } from 'express-validator';


export const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;


  if (err.code === 11000) {
    message = 'Ya existe un registro con ese valor';
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(error => error.message).join(', ');
    statusCode = 400;
  }

  if (err.name === 'CastError') {
    message = 'Formato de ID inválido';
    statusCode = 400;
  }


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