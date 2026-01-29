import { useEffect, useState } from 'react';
import api from '../utils/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-4 text-center">Proyectos</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        Aquí puedes ver algunos de los proyectos en los que he trabajado
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {profile?.proyectos?.map((proyecto, idx) => (
          <div key={idx} className="card hover:shadow-xl transition-shadow">
            {proyecto.imagen && (
              <img src={proyecto.imagen} alt={proyecto.nombre} className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-2xl font-bold mb-3">{proyecto.nombre}</h3>
            <p className="text-gray-700 mb-4">{proyecto.descripcion}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {proyecto.tecnologias?.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{tech}</span>
              ))}
            </div>

            <div className="flex gap-4">
              {proyecto.github && (
                <a href={proyecto.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
                  <FiGithub /> GitHub
                </a>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;