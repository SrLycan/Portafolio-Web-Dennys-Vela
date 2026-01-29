import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  // Información personal
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  titulo: {
    type: String,
    required: [true, 'El título profesional es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },

  // Foto principal del perfil 👇
  foto: {
    type: String,
    default: '' // puedes poner un placeholder aquí si quieres
  },
  
  // Contacto
  contacto: {
    telefono: String,
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    direccion: String,
    linkedin: String,
    github: String,
    portfolio: String
  },
  
  // Educación
  educacion: [{
    institucion: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    periodo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true
    },
    foto: {
      type: String,
      default: ''
    }
  }],
  
  // Experiencia técnica
  habilidades: {
    lenguajes: [String],
    frameworks: [String],
    bases_datos: [String],
    herramientas: [String],
    otros: [String]
  },
  
  // Proyectos destacados
  proyectos: [{
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    tecnologias: [String],
    url: String,
    github: String,
    imagen: String,
    destacado: {
      type: Boolean,
      default: false
    }
  }],
  
  // Cursos y certificaciones
  cursos: [{
    nombre: String,
    institucion: String,
    periodo: String,
    descripcion: String
  }],
  
  // Idiomas
  idiomas: [{
    idioma: {
      type: String,
      required: true
    },
    nivel: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    }
  }],
  
  // Referencias
  referencias: [{
    nombre: String,
    telefono: String,
    email: String,
    relacion: String
  }],
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar la fecha de modificación
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
