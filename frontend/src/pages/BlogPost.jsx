import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiArrowLeft, FiClock, FiEye, FiCalendar } from 'react-icons/fi';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  if (!post) return <div className="container mx-auto px-4 py-16 text-center">Post no encontrado</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
        <FiArrowLeft /> Volver al blog
      </Link>

      <article className="max-w-4xl mx-auto">
        {post.imagen && (
          <img src={post.imagen} alt={post.titulo} className="w-full h-96 object-cover rounded-xl mb-8" />
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">{post.categoria}</span>
          <span className="flex items-center gap-1"><FiCalendar size={16} /> {formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1"><FiClock size={16} /> {post.tiempoLectura} min lectura</span>
          <span className="flex items-center gap-1"><FiEye size={16} /> {post.vistas} vistas</span>
        </div>

        <h1 className="text-5xl font-bold mb-6">{post.titulo}</h1>
        <p className="text-xl text-gray-600 mb-8">{post.resumen}</p>

        <div className="prose prose-lg max-w-none markdown-content">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              },
            }}
          >
            {post.contenido}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.etiquetas?.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;