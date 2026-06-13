import { useState } from 'react';
import { ShoppingCart, User, LogOut, Menu, X, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import Title from '../components/Title';
import Infouser from '../components/infoUser';
import { getInitials } from '../utils/avatar';
import ClienteCompra from './ClienteCompra';
import ClienteHistorico from './ClienteHistorico';
import Perfil from '../pages/Perfil';

const NAV_ITEMS = [
  { key: 'loja',      label: 'Loja',      icon: <ShoppingCart className="w-5 h-5" /> },
  { key: 'historico', label: 'Histórico', icon: <BarChart3    className="w-5 h-5" /> },
  { key: 'perfil',    label: 'Perfil',    icon: <User         className="w-5 h-5" /> },
];

const TAB_TITLES = {
  loja:      'Loja — Efectuar Compra',
  historico: 'Histórico de Compras',
  perfil:    'Meu Perfil',
};

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

function ClienteDashboard() {
  const [activeTab, setActiveTab] = useState('loja');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNav = (key) => { setActiveTab(key); setSidebarOpen(false); };

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
            <Infouser Nome={user?.name || 'Cliente'} user="Cliente" />
            <button onClick={() => handleNav('perfil')}>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold hover:bg-blue-700 transition">
                {getInitials(user?.name)}
              </div>
            </button>
          </div>
        </header>

        <hr className="border-slate-200 shrink-0" />

        <main className="flex-1 overflow-y-auto bg-slate-100">
          {activeTab === 'loja'      && <ClienteCompra />}
          {activeTab === 'historico' && <ClienteHistorico />}
          {activeTab === 'perfil'    && <Perfil embedded />}
        </main>
      </div>
    </div>
  );
}

export default ClienteDashboard;
