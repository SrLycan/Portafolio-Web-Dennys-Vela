import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import { FiSave } from 'react-icons/fi';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState({
    titulo: '',
    resumen: '',
    contenido: '',
    categoria: 'backend',
    etiquetas: [],
    imagen: '',
    publicado: false
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/blog/admin/all`);
      const foundPost = response.data.data.find(p => p._id === id);
      if (foundPost) {
        setPost(foundPost);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar el post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (id) {
        await api.put(`/blog/${id}`, post);
        alert('Post actualizado exitosamente');
      } else {
        await api.post('/blog', post);
        alert('Post creado exitosamente');
      }
      navigate('/admin/blog');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar el post');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !post.etiquetas.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        etiquetas: [...prev.etiquetas, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      etiquetas: prev.etiquetas.filter(tag => tag !== tagToRemove)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {id ? 'Editar Post' : 'Nuevo Post'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <div className="space-y-4">
              <div>
                <label className="label">Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={post.titulo}
                  onChange={handleChange}
                  className="input"
                  required
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {post.titulo.length}/200 caracteres
                </p>
              </div>

              <div>
                <label className="label">Resumen *</label>
                <textarea
                  name="resumen"
                  value={post.resumen}
                  onChange={handleChange}
                  className="input min-h-[100px]"
                  required
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {post.resumen.length}/500 caracteres
                </p>
              </div>

              <div>
                <label className="label">Contenido * (Markdown)</label>
                <textarea
                  name="contenido"
                  value={post.contenido}
                  onChange={handleChange}
                  className="input min-h-[400px] font-mono text-sm"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Palabras: {post.contenido.trim().split(/\s+/).filter(Boolean).length} 
                  {post.contenido.trim().split(/\s+/).filter(Boolean).length < 1000 && 
                    ' (mínimo 1000 palabras requeridas)'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Categoría *</label>
                  <select
                    name="categoria"
                    value={post.categoria}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="devops">DevOps</option>
                    <option value="seguridad">Seguridad</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="label">URL de Imagen</label>
                  <input
                    type="url"
                    name="imagen"
                    value={post.imagen}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="label">Etiquetas</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="input flex-1"
                    placeholder="Escribe una etiqueta y presiona Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="btn-primary"
                  >
                    Agregar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.etiquetas.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="publicado"
                  id="publicado"
                  checked={post.publicado}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600"
                />
                <label htmlFor="publicado" className="text-sm font-medium">
                  Publicar inmediatamente
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || post.contenido.trim().split(/\s+/).filter(Boolean).length < 1000}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <FiSave />
              {saving ? 'Guardando...' : id ? 'Actualizar' : 'Crear Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/blog')}
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

export default EditPost;
