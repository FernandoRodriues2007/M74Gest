import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { BarChart3, Package, DollarSign, Users, LogOut, Settings, User } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      icon: Package,
      title: 'Produtos',
      description: 'Gerencie seu estoque de produtos',
      color: 'from-blue-500 to-blue-600',
      path: '/produtos'
    },
    {
      icon: Users,
      title: 'Clientes',
      description: 'Consulte dados de clientes',
      color: 'from-green-500 to-green-600',
      path: '/clientes'
    },
    {
      icon: DollarSign,
      title: 'Vendas',
      description: 'Registre e acompanhe vendas',
      color: 'from-purple-500 to-purple-600',
      path: '/vendas'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Admin',
      description: 'Acesse o painel administrativo completo',
      color: 'from-orange-500 to-orange-600',
      path: '/admin',
      admin: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">M74</h1>
              <p className="text-xs text-slate-500">Gestão Inteligente</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-slate-800">{user?.name}</p>
              <p className="text-sm text-slate-500 capitalize">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">
              {user?.avatar}
            </div>
            <div className="flex gap-2 border-l border-slate-200 pl-4">
              <button
                onClick={() => navigate('/perfil')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                title="Perfil"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Boas-vindas */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Bem-vindo, {user?.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-600">Gerencie sua loja de forma simples e segura</p>
        </div>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => {
            // Oculta Dashboard Admin para usuários normais
            if (item.admin && user?.role !== 'admin') return null;

            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="group relative overflow-hidden rounded-xl transition duration-300 hover:shadow-xl"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition duration-300`}></div>

                {/* Conteúdo */}
                <div className="relative bg-white p-6 rounded-xl border border-slate-200 group-hover:border-transparent">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-white transition duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm group-hover:text-slate-100 transition duration-300">
                    {item.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 text-blue-600 group-hover:text-white transition duration-300">
                    →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Cards de Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Total de Produtos</p>
            <p className="text-3xl font-bold text-slate-800">1,247</p>
            <p className="text-green-600 text-xs mt-2">↑ 12% este mês</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Clientes Ativos</p>
            <p className="text-3xl font-bold text-slate-800">342</p>
            <p className="text-green-600 text-xs mt-2">↑ 8% este mês</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Vendas do Mês</p>
            <p className="text-3xl font-bold text-slate-800">42.000 kz</p>
            <p className="text-green-600 text-xs mt-2">↑ 5% vs mês anterior</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
