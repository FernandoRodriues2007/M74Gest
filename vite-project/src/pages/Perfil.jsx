import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { Save, Lock, ChevronLeft, Mail, Phone, FileText, MapPin, Eye, EyeOff } from 'lucide-react';
import { validations } from '../utils/validations';

function Perfil() {
  const navigate = useNavigate();
  const { user, updateUser, changePassword, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nif: user?.nif || '',
    company: user?.company || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (validations.isEmpty(formData.name)) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (validations.isEmpty(formData.email)) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validations.email(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!validations.isEmpty(formData.phone) && !validations.phone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!validations.isEmpty(formData.nif) && !validations.nif(formData.nif)) {
      newErrors.nif = 'NIF inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (validations.isEmpty(passwordData.currentPassword)) {
      newErrors.currentPassword = 'Senha atual é obrigatória';
    }

    if (validations.isEmpty(passwordData.newPassword)) {
      newErrors.newPassword = 'Nova senha é obrigatória';
    } else if (!validations.password(passwordData.newPassword)) {
      newErrors.newPassword = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    const result = await updateUser({
      name: formData.name,
      phone: formData.phone,
      nif: formData.nif,
      company: formData.company
    });

    if (result.success) {
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } else {
      alert(result.message || 'Erro ao atualizar perfil.');
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    const result = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    if (result.success) {
      alert('Senha alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert(result.message || 'Erro ao alterar senha.');
    }
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Meu Perfil</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Card Principal */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8 pb-8 border-b border-slate-200">
            {/* Avatar */}
<div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-5xl">
              {user?.avatar}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{user?.name}</h2>
              <p className="text-slate-600 capitalize mb-2">
                {user?.role === 'admin' ? 'Administrador' : 'Usuário Regular'}
              </p>
              <p className="text-slate-500 text-sm">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-semibold"
            >
              Sair
            </button>
          </div>

          {/* Informações Pessoais */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Informações Pessoais</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  } ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                      isEditing
                        ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    } ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                </div>
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                      isEditing
                        ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    } ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                </div>
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* NIF */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">NIF</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                      isEditing
                        ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    } ${errors.nif ? 'border-red-500' : ''}`}
                  />
                  <FileText className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                </div>
                {errors.nif && <p className="text-sm text-red-600 mt-1">{errors.nif}</p>}
              </div>

              {/* Empresa */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Empresa</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                    isEditing
                      ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
            )}
          </div>

          {/* Alteração de Senha */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Segurança
            </h3>

            <div className="space-y-4">
              {/* Senha Atual */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Senha Atual</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                      passwordErrors.currentPassword
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
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
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.currentPassword}</p>
                )}
              </div>

              {/* Nova Senha */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nova Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                    passwordErrors.newPassword
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar Nova Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                    passwordErrors.confirmPassword
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <button
                onClick={handleChangePassword}
                className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <Lock className="w-5 h-5" />
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Perfil;
