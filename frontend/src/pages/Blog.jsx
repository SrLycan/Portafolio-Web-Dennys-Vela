import { useEffect, useState } from 'react';
import api from '../utils/api';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [categoria]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog', { params: { categoria } });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categorias = ['todos', 'frontend', 'backend', 'fullstack', 'devops', 'seguridad'];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-4 text-center">Blog Técnico</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        Artículos sobre desarrollo web, mejores prácticas y tecnologías modernas
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat === 'todos' ? '' : cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              (cat === 'todos' && !categoria) || categoria === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-600 mt-12">No hay posts en esta categoría</p>
      )}
    </div>
  );
};

export default Blog;