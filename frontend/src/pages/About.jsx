import { useEffect, useState } from 'react';
import api from '../utils/api';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>No se pudo cargar el perfil.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Información Personal */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="card">
          <h1 className="text-4xl font-bold mb-4">{profile.nombre}</h1>
          <p className="text-xl text-primary-600 mb-4">{profile.titulo}</p>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {profile.descripcion}
          </p>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FiMail />
              <a
                href={`mailto:${profile.contacto.email}`}
                className="hover:text-primary-600"
              >
                {profile.contacto.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone />
              <a
                href={`tel:${profile.contacto.telefono}`}
                className="hover:text-primary-600"
              >
                {profile.contacto.telefono}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>{profile.contacto.direccion}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Educación */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Educación</h2>
        <div className="space-y-6">
          {profile.educacion.map((edu, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-semibold mb-2">{edu.titulo}</h3>
              <p className="text-primary-600 mb-2">{edu.institucion}</p>
              <p className="text-gray-600 mb-2">{edu.periodo}</p>
              {edu.descripcion && <p className="text-gray-700">{edu.descripcion}</p>}
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                {edu.estado === 'completado'
                  ? 'Completado'
                  : edu.estado === 'en_curso'
                  ? 'En curso'
                  : 'No concluido'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Habilidades */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Habilidades Técnicas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Lenguajes</h3>
            <div className="flex flex-wrap gap-2">
              {profile.habilidades.lenguajes.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {profile.habilidades.frameworks.map((fw, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Bases de Datos</h3>
            <div className="flex flex-wrap gap-2">
              {profile.habilidades.bases_datos.map((db, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {db}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Herramientas</h3>
            <div className="flex flex-wrap gap-2">
              {profile.habilidades.herramientas.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Idiomas */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Idiomas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {profile.idiomas.map((idioma, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold mb-2">{idioma.idioma}</h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${idioma.nivel}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{idioma.nivel}%</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


export default About;