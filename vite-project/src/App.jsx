import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute, PublicRoute } from './components/ProtectedRoute';

// Páginas
import LandingPage from './components/Home';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Vendas from './pages/Vendas';
import Perfil from './pages/Perfil';
import Dash from './admin/dashboard';
import ClienteDashboard from './Clientes/ClienteDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />
          <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />

          {/* Dashboard por role */}
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/cliente"   element={<PrivateRoute clientOnly><ClienteDashboard /></PrivateRoute>} />

          {/* Rotas do funcionário */}
          <Route path="/produtos" element={<PrivateRoute><Produtos /></PrivateRoute>} />
          <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
          <Route path="/vendas"   element={<PrivateRoute><Vendas /></PrivateRoute>} />
          <Route path="/perfil"   element={<PrivateRoute><Perfil /></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<PrivateRoute adminOnly><Dash /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;