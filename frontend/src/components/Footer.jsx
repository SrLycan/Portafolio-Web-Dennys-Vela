import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Dennys Vela</h3>
            <p className="text-sm">
              Desarrollador Full Stack apasionado por crear soluciones
              innovadoras y eficientes.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary-400 transition-colors"
                >
                  Sobre Mí
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-primary-400 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-2">
              <a
                href="mailto:dennysvela@hotmail.com"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors"
              >
                <FiMail />
                dennysvela@hotmail.com
              </a>
              <a
                href="tel:0999465255"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors"
              >
                <FiPhone />
                0999465255
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/SrLycan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  <FiGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dennys-vela-a88a91275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  <FiLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Dennys Vela. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;