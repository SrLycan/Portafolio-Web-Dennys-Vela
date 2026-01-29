import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado, usuario no encontrado'
        });
      }

      next();
    } catch (error) {
      console.error('Error en autenticación:', error);
      return res.status(401).json({
        success: false,
        message: 'No autorizado, token inválido'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado, no se proporcionó token'
    });
  }
};


export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'No autorizado, se requieren permisos de administrador'
    });
  }
};


export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};
