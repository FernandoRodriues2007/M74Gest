import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { BarChart3, Package, Users, DollarSign, User } from 'lucide-react';
import Title from '../components/Title';
import Infouser from '../components/infoUser';
import Produtos from './Produtos';
import Clientes from './Clientes';
import Vendas from './Vendas';
import Perfil from './Perfil';
import { getInitials } from '../utils/avatar';

function HomeContent({ user }) {
  return (
    <section className="p-6 space-y-6">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-slate-800">
          Bem-vindo, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-slate-500 mt-1">Gerencie a sua loja de forma simples e segura</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
          <p className="text-slate-600 text-sm font-semibold mb-2">Produtos</p>
          <p className="text-slate-500 text-sm">Consulte e gira o estoque de produtos</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
          <p className="text-slate-600 text-sm font-semibold mb-2">Clientes</p>
          <p className="text-slate-500 text-sm">Consulte e gira os dados de clientes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
          <p className="text-slate-600 text-sm font-semibold mb-2">Vendas</p>
          <p className="text-slate-500 text-sm">Registe e acompanhe as vendas</p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const roleLabel = () => {
    if (user?.role === 'admin') return 'Administrador';
    if (user?.role === 'client') return 'Cliente';
    return 'Funcionário';
  };

  const navItems = [
    { key: 'home',     label: 'Dashboard',  Icon: BarChart3 },
    { key: 'produtos', label: 'Produtos',   Icon: Package   },
    { key: 'clientes', label: 'Clientes',   Icon: Users     },
    { key: 'vendas',   label: 'Vendas',     Icon: DollarSign },
    { key: 'perfil',   label: 'Perfil',     Icon: User      },
  ];

  const tabTitles = {
    home:     'Dashboard',
    produtos: 'Produtos',
    clientes: 'Clientes',
    vendas:   'Vendas',
    perfil:   'Meu Perfil',
  };

  return (
    <div className="bg-slate-100 grid md:grid-cols-6 min-h-screen">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col justify-between bg-slate-800 p-7">
        <div className="space-y-10">
          <h1 className="text-3xl text-slate-100 font-bold">M74</h1>

          <nav className="space-y-3 grid grid-cols-1 text-start">
            {navItems.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex gap-4 items-center p-3 rounded-md transition duration-300 ${
                  activeTab === key
                    ? 'bg-white text-slate-800 font-bold'
                    : 'text-white hover:text-slate-800 hover:bg-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-center py-2 px-4 rounded-md text-white border border-slate-600 hover:bg-slate-700 transition duration-300"
        >
          Sair
        </button>
      </aside>

      {/* ── Conteúdo principal ── */}
      <div className="col-span-5 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className="flex w-full p-4 justify-between items-center bg-slate-100 shrink-0">
          <Title Title={tabTitles[activeTab]} />
          <div className="flex space-x-4 items-center">
            <Infouser Nome={user?.name || 'Utilizador'} user={roleLabel()} />
            <button onClick={() => setActiveTab('perfil')}>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0 hover:bg-blue-700 transition">
                {getInitials(user?.name)}
              </div>
            </button>
          </div>
        </header>

        <hr className="border-slate-300 shrink-0" />

        {/* Área de conteúdo com scroll */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home'     && <HomeContent user={user} />}
          {activeTab === 'produtos' && <Produtos />}
          {activeTab === 'clientes' && <Clientes />}
          {activeTab === 'vendas'   && <Vendas />}
          {activeTab === 'perfil'   && <Perfil embedded />}
        </main>
      </div>

    </div>
  );
}

export default Home;
