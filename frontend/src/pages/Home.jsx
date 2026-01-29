import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        console.log('Profile response:', response.data); // 
        setProfile(response.data.data || response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProfile();
  }, []);

  const technologies = [
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
      name: 'Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
      name: 'Django',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    {
      name: 'PostgreSQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    {
      name: 'Tailwind CSS',
      logo: 'https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img
              src={profile?.foto || 'https://via.placeholder.com/300'}
              alt={profile?.nombre || 'Foto de perfil'}
              className="w-48 h-48 rounded-full object-cover border-4 border-primary-600 shadow-lg"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
            Hola, soy <span className="text-primary-600">{profile?.nombre || 'Dennys Vela'}</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 animate-fadeIn">
            {profile?.titulo || 'Desarrollador Full Stack'}
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeIn">
            {profile?.descripcion || 'Apasionado por la tecnología, la robótica y el desarrollo de software.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-fadeIn">
            <Link to="/projects" className="btn-primary flex items-center gap-2">
              Ver Proyectos <FiArrowRight />
            </Link>
            <Link to="/blog" className="btn-secondary flex items-center gap-2">
              Leer Blog <FiArrowRight />
            </Link>
          </div>

          <div className="flex gap-6 justify-center text-gray-600 animate-fadeIn">
            <a href={profile?.contacto?.github || 'https://github.com/SrLycan'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">
              <FiGithub size={28} />
            </a>
            <a href={profile?.contacto?.linkedin || 'https://www.linkedin.com/in/dennys-vela-a88a91275/'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">
              <FiLinkedin size={28} />
            </a>
            <a href={`mailto:${profile?.contacto?.email || 'dennysvela@hotmail.com'}`} className="hover:text-primary-600 transition-colors">
              <FiMail size={28} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Tecnologías que domino</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {technologies.map((tech) => (
            <div key={tech.name} className="card text-center hover:scale-105 transition-transform flex flex-col items-center gap-4 p-8">
              <img src={tech.logo} alt={tech.name} className="w-16 h-16 object-contain" />
              <p className="font-semibold text-lg">{tech.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
