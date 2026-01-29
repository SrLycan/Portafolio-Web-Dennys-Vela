import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Portafolio Dennys Vela',
      version: '1.0.0',
      description: 'API RESTful para gestión de portafolio profesional con blog técnico',
      contact: {
        name: 'Dennys Vela',
        email: 'dennysvela@hotmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://tu-api.render.com',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'Rol del usuario'
            }
          }
        },
        Profile: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo'
            },
            titulo: {
              type: 'string',
              description: 'Título profesional'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción personal'
            },
            contacto: {
              type: 'object',
              properties: {
                telefono: { type: 'string' },
                email: { type: 'string', format: 'email' },
                direccion: { type: 'string' },
                linkedin: { type: 'string' },
                github: { type: 'string' }
              }
            },
            educacion: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  institucion: { type: 'string' },
                  titulo: { type: 'string' },
                  periodo: { type: 'string' },
                  estado: { 
                    type: 'string',
                    enum: ['completado', 'en_curso', 'no_concluido']
                  }
                }
              }
            },
            habilidades: {
              type: 'object',
              properties: {
                lenguajes: { type: 'array', items: { type: 'string' } },
                frameworks: { type: 'array', items: { type: 'string' } },
                bases_datos: { type: 'array', items: { type: 'string' } }
              }
            },
            proyectos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  nombre: { type: 'string' },
                  descripcion: { type: 'string' },
                  tecnologias: { type: 'array', items: { type: 'string' } },
                  url: { type: 'string' },
                  github: { type: 'string' }
                }
              }
            }
          }
        },
        BlogPost: {
          type: 'object',
          properties: {
            titulo: {
              type: 'string',
              description: 'Título del post'
            },
            slug: {
              type: 'string',
              description: 'URL amigable del post'
            },
            resumen: {
              type: 'string',
              description: 'Resumen breve del post'
            },
            contenido: {
              type: 'string',
              description: 'Contenido completo en markdown'
            },
            categoria: {
              type: 'string',
              enum: ['frontend', 'backend', 'fullstack', 'devops', 'seguridad', 'otros']
            },
            etiquetas: {
              type: 'array',
              items: { type: 'string' }
            },
            publicado: {
              type: 'boolean',
              description: 'Estado de publicación'
            },
            vistas: {
              type: 'number',
              description: 'Contador de vistas'
            },
            tiempoLectura: {
              type: 'number',
              description: 'Tiempo estimado de lectura en minutos'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
