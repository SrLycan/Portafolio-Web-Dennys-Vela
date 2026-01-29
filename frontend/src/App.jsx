import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas públicas
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Páginas de administración
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';          // 👈 nuevo
import ChangePassword from './pages/admin/ChangePassword'; // 👈 nuevo
import Dashboard from './pages/admin/Dashboard';
import EditProfile from './pages/admin/EditProfile';
import ManageBlog from './pages/admin/ManageBlog';
import EditPost from './pages/admin/EditPost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Rutas de administración */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/register" element={<Register />} />          
              <Route path="/changepassword" element={<ChangePassword />} /> 

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog"
                element={
                  <ProtectedRoute>
                    <ManageBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/new"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/:id"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
