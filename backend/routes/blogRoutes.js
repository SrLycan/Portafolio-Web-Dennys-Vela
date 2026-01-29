import express from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/errorHandler.js';
import { protect, admin } from '../middleware/auth.js';
import {
  getPosts,
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  togglePublish
} from '../controllers/blogController.js';

const router = express.Router();

// Validaciones
const postValidation = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ max: 200 })
    .withMessage('El título no puede tener más de 200 caracteres')
    .trim(),
  body('resumen')
    .notEmpty()
    .withMessage('El resumen es requerido')
    .isLength({ max: 500 })
    .withMessage('El resumen no puede tener más de 500 caracteres')
    .trim(),
  body('contenido')
    .notEmpty()
    .withMessage('El contenido es requerido')
    .isLength({ min: 1000 })
    .withMessage('El contenido debe tener al menos 1000 caracteres'),
  body('categoria')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'devops', 'seguridad', 'otros'])
    .withMessage('Categoría inválida'),
  handleValidationErrors
];

// Rutas públicas
router.get('/', getPosts);
router.get('/:slug', getPost);

// Rutas protegidas (solo admin)
router.get('/admin/all', protect, admin, getAllPosts);
router.post('/', protect, admin, postValidation, createPost);
router.put('/:id', protect, admin, postValidation, updatePost);
router.delete('/:id', protect, admin, deletePost);
router.patch('/:id/toggle-publish', protect, admin, togglePublish);

export default router;
