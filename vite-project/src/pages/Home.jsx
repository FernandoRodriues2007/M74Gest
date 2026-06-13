import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { BarChart3, Package, Users, DollarSign, User, Menu, X, LogOut } from 'lucide-react';
import Title from '../components/Title';
import Infouser from '../components/infoUser';
import Produtos from './Produtos';
import Clientes from './Clientes';
import Vendas from './Vendas';
import Perfil from './Perfil';
import { getInitials } from '../utils/avatar';

const NAV_ITEMS = [
  { key: 'home',     label: 'Dashboard', icon: <BarChart3  className="w-5 h-5" /> },
  { key: 'produtos', label: 'Produtos',  icon: <Package    className="w-5 h-5" /> },
  { key: 'clientes', label: 'Clientes',  icon: <Users      className="w-5 h-5" /> },
  { key: 'vendas',   label: 'Vendas',    icon: <DollarSign className="w-5 h-5" /> },
  { key: 'perfil',   label: 'Perfil',    icon: <User       className="w-5 h-5" /> },
];

function NavContent({ activeTab, onNav, onLogout }) {
  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl text-slate-100 font-bold">M74</h1>
        <nav className="space-y-2 grid grid-cols-1 text-start">
          {NAV_ITEMS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => onNav(key)}
              className={`flex gap-4 items-center p-3 rounded-md transition duration-300 ${
                activeTab === key
                  ? 'bg-white text-slate-800 font-bold'
                  : 'text-white hover:text-slate-800 hover:bg-white'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 w-full py-2 px-4 rounded-md text-white border border-slate-600 hover:bg-slate-700 transition"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </>
  );
}

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

const TAB_TITLES = {
  home:     'Dashboard',
  produtos: 'Produtos',
  clientes: 'Clientes',
  vendas:   'Vendas',
  perfil:   'Meu Perfil',
};

function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNav = (key) => { setActiveTab(key); setSidebarOpen(false); };

  const roleLabel = () => {
    if (user?.role === 'admin') return 'Administrador';
    if (user?.role === 'client') return 'Cliente';
    return 'Funcionário';
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col md:grid md:grid-cols-6">

      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col justify-between bg-slate-800 p-7">
        <NavContent activeTab={activeTab} onNav={handleNav} onLogout={logout} />
      </aside>

      {/* Drawer mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-slate-800 p-7 flex flex-col justify-between shadow-2xl">
            <NavContent activeTab={activeTab} onNav={handleNav} onLogout={logout} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="col-span-5 flex flex-col h-screen overflow-hidden">
        <header className="flex w-full p-4 justify-between items-center bg-white shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
            <Title Title={TAB_TITLES[activeTab]} />
          </div>
          <div className="flex items-center gap-3">
            <Infouser Nome={user?.name || 'Utilizador'} user={roleLabel()} />
            <button onClick={() => handleNav('perfil')}>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold hover:bg-blue-700 transition">
                {getInitials(user?.name)}
              </div>
            </button>
          </div>
        </header>

        <hr className="border-slate-200 shrink-0" />

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
