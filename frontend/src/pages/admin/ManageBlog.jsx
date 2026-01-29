import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

const ManageBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog/admin/all');
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro?')) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchPosts();
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  const togglePublish = async (id) => {
    try {
      await api.patch(`/blog/${id}/toggle-publish`);
      fetchPosts();
    } catch (error) {
      alert('Error al cambiar estado');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Gestionar Blog</h1>
          <Link to="/admin/blog/new" className="btn-primary flex items-center gap-2">
            <FiPlus /> Nuevo Post
          </Link>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="card flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{post.titulo}</h3>
                <p className="text-gray-600 text-sm">{post.resumen.substring(0, 100)}...</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">{post.categoria}</span>
                  <span className={`text-xs px-2 py-1 rounded ${post.publicado ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => togglePublish(post._id)} className="btn-secondary">
                  {post.publicado ? <FiEyeOff /> : <FiEye />}
                </button>
                <Link to={`/admin/blog/${post._id}`} className="btn-secondary">
                  <FiEdit />
                </Link>
                <button onClick={() => handleDelete(post._id)} className="btn-danger">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;