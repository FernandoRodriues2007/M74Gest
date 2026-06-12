import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-semibold">Carregando...</p>
      </div>
    </div>
  );
}

export function PrivateRoute({ children, adminOnly = false, clientOnly = false }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Admin tenta aceder rota não-admin → redireciona para /admin
  if (user?.role === 'admin' && !adminOnly && !clientOnly) {
    return <Navigate to="/admin" replace />;
  }

  // Acesso exclusivo admin
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Acesso exclusivo cliente
  if (clientOnly && user?.role !== 'client') {
    return <Navigate to="/dashboard" replace />;
  }

  // Cliente tenta aceder rota de funcionário → redireciona para /cliente
  if (!adminOnly && !clientOnly && user?.role === 'client') {
    return <Navigate to="/cliente" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loading />;

  if (isAuthenticated) {
    if (user?.role === 'admin')  return <Navigate to="/admin"     replace />;
    if (user?.role === 'client') return <Navigate to="/cliente"   replace />;
    return                              <Navigate to="/dashboard"  replace />;
  }

  return children;
}
