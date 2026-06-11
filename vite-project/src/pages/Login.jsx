import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { validations, getErrorMessage } from '../utils/validations';

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (validations.isEmpty(formData.email)) {
      newErrors.email = getErrorMessage('email', 'required');
    } else if (!validations.email(formData.email)) {
      newErrors.email = getErrorMessage('email', 'invalid');
    }

    if (validations.isEmpty(formData.password)) {
      newErrors.password = getErrorMessage('password', 'required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      const nextPath = result.user?.role === 'admin' ? '/admin' : '/dashboard';
      navigate(nextPath);
    } else {
      setServerError(result.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">M74</h1>
          <p className="text-slate-400 text-lg">Gestão Inteligente</p>
        </div>

        {/* Card Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Bem-vindo</h2>

          {/* Erro do servidor */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="seu@email.com"
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.password
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="bg-blue-50 rounded-lg p-4 text-sm space-y-2 border border-blue-200">
            <p className="font-semibold text-slate-700">Credenciais de Acesso:</p>
            <div className="space-y-1 text-slate-600">
              <p><span className="font-semibold">Admin:</span> admin@m74.ao / Admin123!</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 mt-6 text-sm">
          © 2024 M74 Gestão. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

export default Login;
