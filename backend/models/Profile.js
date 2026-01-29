import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({

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

  foto: {
    type: String,
    default: '' 
  },
  

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
  

  habilidades: {
    lenguajes: [String],
    frameworks: [String],
    bases_datos: [String],
    herramientas: [String],
    otros: [String]
  },
  

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
  

  cursos: [{
    nombre: String,
    institucion: String,
    periodo: String,
    descripcion: String
  }],
  

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


profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
