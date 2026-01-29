import { Link } from 'react-router-dom';
import { FiClock, FiEye } from 'react-icons/fi';

const BlogCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="card hover:shadow-lg transition-shadow duration-300">
      {post.imagen && (
        <img
          src={post.imagen}
          alt={post.titulo}
          className="w-full h-48 object-cover rounded-t-xl -mt-6 -mx-6 mb-4"
        />
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
          {post.categoria}
        </span>
        <span className="flex items-center gap-1">
          <FiClock size={14} />
          {post.tiempoLectura} min
        </span>
        <span className="flex items-center gap-1">
          <FiEye size={14} />
          {post.vistas}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
        <Link to={`/blog/${post.slug}`}>{post.titulo}</Link>
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-3">{post.resumen}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
        <Link
          to={`/blog/${post.slug}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;