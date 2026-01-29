import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiBookOpen, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Panel de Administración</h1>
          <button onClick={logout} className="btn-danger flex items-center gap-2">
            <FiLogOut /> Cerrar Sesión
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/admin/profile" className="card hover:shadow-lg transition-shadow">
            <FiUser size={48} className="text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Editar Perfil</h2>
            <p className="text-gray-600">Actualiza tu información personal y profesional</p>
          </Link>

          <Link to="/admin/blog" className="card hover:shadow-lg transition-shadow">
            <FiBookOpen size={48} className="text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Gestionar Blog</h2>
            <p className="text-gray-600">Crea y edita posts de tu blog técnico</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;