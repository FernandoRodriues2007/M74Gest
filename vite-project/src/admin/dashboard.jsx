import { useState } from "react";
import Infouser from "../components/infoUser";
import { Package, DollarSign, Settings, BarChart3, Menu, X, LogOut } from "lucide-react";
import Title from "../components/Title";
import DashboardContent from "./DashboardContent";
import EstoqueContent from "./EstoqueContent";
import FaturacaoContent from "./FaturacaoContent";
import ConfiguracaoContent from "./ConfiguracaoContent";
import { useAuth } from "../contexts/useAuth";
import { getInitials } from "../utils/avatar";

const NAV_ITEMS = [
    { key: 'dashboard',    label: 'Dashboard',   icon: <BarChart3  className="w-5 h-5" /> },
    { key: 'estoque',      label: 'Estoque',      icon: <Package    className="w-5 h-5" /> },
    { key: 'faturacao',    label: 'Faturação',    icon: <DollarSign className="w-5 h-5" /> },
    { key: 'configuracao', label: 'Configuração', icon: <Settings   className="w-5 h-5" /> },
];

const TAB_TITLES = {
    dashboard:    'Dashboard',
    estoque:      'Estoque',
    faturacao:    'Faturação',
    configuracao: 'Configuração',
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

function Dash() {
    const [activeTab, setActiveTab] = useState('dashboard');
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
                            {sidebarOpen
                                ? <X className="w-5 h-5 text-slate-700" />
                                : <Menu className="w-5 h-5 text-slate-700" />
                            }
                        </button>
                        <Title Title={TAB_TITLES[activeTab]} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Infouser Nome={user?.name || 'Utilizador'} user="Administrador" />
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {getInitials(user?.name)}
                        </div>
                    </div>
                </header>

                <hr className="border-slate-200 shrink-0" />

                <main className="flex-1 overflow-y-auto">
                    {activeTab === 'dashboard'    && <DashboardContent />}
                    {activeTab === 'estoque'      && <EstoqueContent />}
                    {activeTab === 'faturacao'    && <FaturacaoContent />}
                    {activeTab === 'configuracao' && <ConfiguracaoContent />}
                </main>
            </div>
        </div>
    );
}

export default Dash;
