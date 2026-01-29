import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiBookOpen, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/', icon: FiHome },
    { name: 'Sobre Mí', path: '/about', icon: FiUser },
    { name: 'Proyectos', path: '/projects', icon: FiBriefcase },
    { name: 'Blog', path: '/blog', icon: FiBookOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Portafolio Web
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <item.icon className="text-lg" />
                {item.name}
              </Link>
            ))}

            {/* Botón de Iniciar Sesión */}
            <a
              href="http://localhost:5173/admin/login"
              className="ml-6 px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                <item.icon className="text-lg" />
                {item.name}
              </Link>
            ))}

            {/* Botón de Iniciar Sesión en menú móvil */}
            <a
              href="http://localhost:5173/admin/login"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold text-center hover:bg-primary-700 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
