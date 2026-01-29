import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede tener más de 200 caracteres']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  resumen: {
    type: String,
    required: [true, 'El resumen es requerido'],
    maxlength: [500, 'El resumen no puede tener más de 500 caracteres']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es requerido'],
    minlength: [1000, 'El contenido debe tener al menos 1000 caracteres']
  },
  autor: {
    type: String,
    default: 'Dennys Vela'
  },
  categoria: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'devops', 'seguridad', 'otros'],
    default: 'backend'
  },
  etiquetas: [{
    type: String,
    trim: true
  }],
  imagen: {
    type: String,
    default: ''
  },
  publicado: {
    type: Boolean,
    default: false
  },
  vistas: {
    type: Number,
    default: 0
  },
  tiempoLectura: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


blogPostSchema.pre('validate', function(next) {
  if (this.isModified('titulo') && this.titulo) {
    this.slug = this.titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

blogPostSchema.pre('save', function(next) {

  if (this.isModified('contenido')) {
    const palabras = this.contenido.trim().split(/\s+/).length;
    this.tiempoLectura = Math.ceil(palabras / 200);
  }
  
  this.updatedAt = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;