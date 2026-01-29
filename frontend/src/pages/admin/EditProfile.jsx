import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FiSave, FiPlus, FiTrash2, FiImage } from 'react-icons/fi';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar perfil. Asegúrate de haber ejecutado node seed.js');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profile', profile);
      alert('Perfil actualizado exitosamente');
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Error al actualizar perfil');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  // Funciones para Educación
  const addEducacion = () => {
    setProfile(prev => ({
      ...prev,
      educacion: [...prev.educacion, {
        institucion: '',
        titulo: '',
        periodo: '',
        descripcion: '',
        estado: 'completado'
      }]
    }));
  };

  const updateEducacion = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      educacion: prev.educacion.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducacion = (index) => {
    setProfile(prev => ({
      ...prev,
      educacion: prev.educacion.filter((_, i) => i !== index)
    }));
  };

  // Funciones para Proyectos
  const addProyecto = () => {
    setProfile(prev => ({
      ...prev,
      proyectos: [...prev.proyectos, {
        nombre: '',
        descripcion: '',
        tecnologias: [],
        url: '',
        github: '',
        imagen: '',
        destacado: false
      }]
    }));
  };

  const updateProyecto = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      proyectos: prev.proyectos.map((proy, i) => 
        i === index ? { ...proy, [field]: value } : proy
      )
    }));
  };

  const removeProyecto = (index) => {
    setProfile(prev => ({
      ...prev,
      proyectos: prev.proyectos.filter((_, i) => i !== index)
    }));
  };

  const addTecnologia = (proyectoIndex, tecnologia) => {
    if (!tecnologia.trim()) return;
    setProfile(prev => ({
      ...prev,
      proyectos: prev.proyectos.map((proy, i) => 
        i === proyectoIndex 
          ? { ...proy, tecnologias: [...proy.tecnologias, tecnologia] }
          : proy
      )
    }));
  };

  const removeTecnologia = (proyectoIndex, tecIndex) => {
    setProfile(prev => ({
      ...prev,
      proyectos: prev.proyectos.map((proy, i) => 
        i === proyectoIndex 
          ? { ...proy, tecnologias: proy.tecnologias.filter((_, ti) => ti !== tecIndex) }
          : proy
      )
    }));
  };

  // Funciones para Habilidades
  const addSkill = (category, value) => {
    if (!value.trim()) return;
    setProfile(prev => ({
      ...prev,
      habilidades: {
        ...prev.habilidades,
        [category]: [...prev.habilidades[category], value]
      }
    }));
  };

  const removeSkill = (category, index) => {
    setProfile(prev => ({
      ...prev,
      habilidades: {
        ...prev.habilidades,
        [category]: prev.habilidades[category].filter((_, i) => i !== index)
      }
    }));
  };

  // Funciones para Idiomas
  const addIdioma = () => {
    setProfile(prev => ({
      ...prev,
      idiomas: [...prev.idiomas, { idioma: '', nivel: 50 }]
    }));
  };

  const updateIdioma = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      idiomas: prev.idiomas.map((idioma, i) => 
        i === index ? { ...idioma, [field]: value } : idioma
      )
    }));
  };

  const removeIdioma = (index) => {
    setProfile(prev => ({
      ...prev,
      idiomas: prev.idiomas.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="card max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Error al cargar perfil</h2>
          <p className="text-gray-600 mb-4">
            No se encontró el perfil. Asegúrate de haber ejecutado el seed.
          </p>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-primary">
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Editar Perfil Completo</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-primary-600">📝 Información Personal</h2>
            
            <div className="space-y-4">
              <div>
                <label className="label">Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={profile.nombre}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Título Profesional *</label>
                <input
                  type="text"
                  name="titulo"
                  value={profile.titulo}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ej: Desarrollador Full Stack"
                  required
                />
              </div>

              <div>
                <label className="label">Descripción / Biografía *</label>
                <textarea
                  name="descripcion"
                  value={profile.descripcion}
                  onChange={handleChange}
                  className="input min-h-[120px]"
                  placeholder="Escribe sobre ti, tus intereses y objetivos..."
                  required
                />
              </div>

              <div>
                <label className="label">Foto de Perfil</label>
                
                {/* Vista previa de la foto */}
                {profile.foto && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={profile.foto} 
                      alt="Vista previa" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary-600 shadow-lg"
                    />
                  </div>
                )}

                {/* Método más fácil: URL directa */}
                <div>
                  <label className="label">Pega la URL de tu foto</label>
                  <input
                    type="url"
                    name="foto"
                    value={profile.foto || ''}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://i.imgur.com/tu-imagen.jpg"
                  />
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                      <FiImage className="flex-shrink-0" />
                      <span>
                        <strong>Cómo subir tu foto:</strong> Ve a{' '}
                        <a 
                          href="https://imgur.com/upload" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary-600 hover:underline font-semibold"
                        >
                          Imgur
                        </a>
                        {' '}→ Sube tu foto → Click derecho en la imagen → "Copiar dirección de imagen" → Pega aquí
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: CONTACTO */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-primary-600">📧 Información de Contacto</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  name="contacto.email"
                  value={profile.contacto.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Teléfono</label>
                <input
                  type="tel"
                  name="contacto.telefono"
                  value={profile.contacto.telefono}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Dirección</label>
                <input
                  type="text"
                  name="contacto.direccion"
                  value={profile.contacto.direccion}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">LinkedIn</label>
                <input
                  type="url"
                  name="contacto.linkedin"
                  value={profile.contacto.linkedin}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://linkedin.com/in/tu-usuario"
                />
              </div>

              <div>
                <label className="label">GitHub</label>
                <input
                  type="url"
                  name="contacto.github"
                  value={profile.contacto.github}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://github.com/tu-usuario"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: EDUCACIÓN */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary-600">🎓 Educación</h2>
              <button type="button" onClick={addEducacion} className="btn-primary flex items-center gap-2">
                <FiPlus /> Agregar
              </button>
            </div>

            <div className="space-y-6">
              {profile.educacion.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-700">Educación #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeEducacion(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Institución *</label>
                      <input
                        type="text"
                        value={edu.institucion}
                        onChange={(e) => updateEducacion(index, 'institucion', e.target.value)}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">Título *</label>
                      <input
                        type="text"
                        value={edu.titulo}
                        onChange={(e) => updateEducacion(index, 'titulo', e.target.value)}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">Periodo *</label>
                      <input
                        type="text"
                        value={edu.periodo}
                        onChange={(e) => updateEducacion(index, 'periodo', e.target.value)}
                        className="input"
                        placeholder="2020 - 2024"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">Estado</label>
                      <select
                        value={edu.estado}
                        onChange={(e) => updateEducacion(index, 'estado', e.target.value)}
                        className="input"
                      >
                        <option value="completado">Completado</option>
                        <option value="en_curso">En curso</option>
                        <option value="no_concluido">No concluido</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label">Descripción</label>
                      <textarea
                        value={edu.descripcion || ''}
                        onChange={(e) => updateEducacion(index, 'descripcion', e.target.value)}
                        className="input min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 4: HABILIDADES */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-primary-600">💻 Habilidades Técnicas</h2>
            
            {['lenguajes', 'frameworks', 'bases_datos', 'herramientas'].map(category => (
              <div key={category} className="mb-6">
                <label className="label capitalize">{category.replace('_', ' ')}</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id={`new-${category}`}
                    className="input flex-1"
                    placeholder="Presiona Enter para agregar"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(category, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById(`new-${category}`);
                      addSkill(category, input.value);
                      input.value = '';
                    }}
                    className="btn-primary"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.habilidades[category].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(category, idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SECCIÓN 5: PROYECTOS */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary-600">🚀 Proyectos</h2>
              <button type="button" onClick={addProyecto} className="btn-primary flex items-center gap-2">
                <FiPlus /> Agregar Proyecto
              </button>
            </div>

            <div className="space-y-6">
              {profile.proyectos.map((proy, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-700">Proyecto #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeProyecto(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="label">Nombre del Proyecto *</label>
                      <input
                        type="text"
                        value={proy.nombre}
                        onChange={(e) => updateProyecto(index, 'nombre', e.target.value)}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">Descripción *</label>
                      <textarea
                        value={proy.descripcion}
                        onChange={(e) => updateProyecto(index, 'descripcion', e.target.value)}
                        className="input min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">URL del Proyecto</label>
                        <input
                          type="url"
                          value={proy.url || ''}
                          onChange={(e) => updateProyecto(index, 'url', e.target.value)}
                          className="input"
                          placeholder="https://proyecto.com"
                        />
                      </div>

                      <div>
                        <label className="label">GitHub</label>
                        <input
                          type="url"
                          value={proy.github || ''}
                          onChange={(e) => updateProyecto(index, 'github', e.target.value)}
                          className="input"
                          placeholder="https://github.com/user/repo"
                        />
                      </div>

                      <div>
                        <label className="label">URL de Imagen</label>
                        <input
                          type="url"
                          value={proy.imagen || ''}
                          onChange={(e) => updateProyecto(index, 'imagen', e.target.value)}
                          className="input"
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id={`destacado-${index}`}
                          checked={proy.destacado || false}
                          onChange={(e) => updateProyecto(index, 'destacado', e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`destacado-${index}`} className="text-sm">
                          Proyecto destacado
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="label">Tecnologías</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          id={`tech-${index}`}
                          className="input flex-1"
                          placeholder="Nombre de tecnología"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTecnologia(index, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById(`tech-${index}`);
                            addTecnologia(index, input.value);
                            input.value = '';
                          }}
                          className="btn-primary"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proy.tecnologias.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTecnologia(index, techIdx)}
                              className="text-red-600 hover:text-red-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 6: IDIOMAS */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary-600">🌐 Idiomas</h2>
              <button type="button" onClick={addIdioma} className="btn-primary flex items-center gap-2">
                <FiPlus /> Agregar Idioma
              </button>
            </div>

            <div className="space-y-4">
              {profile.idiomas.map((idioma, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-700">Idioma #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeIdioma(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Idioma *</label>
                      <input
                        type="text"
                        value={idioma.idioma}
                        onChange={(e) => updateIdioma(index, 'idioma', e.target.value)}
                        className="input"
                        placeholder="Ej: Español"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">Nivel: {idioma.nivel}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={idioma.nivel}
                        onChange={(e) => updateIdioma(index, 'nivel', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-4 sticky bottom-4 bg-white p-4 rounded-lg shadow-lg">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 flex-1"
            >
              <FiSave />
              {saving ? 'Guardando...' : 'Guardar Todos los Cambios'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;