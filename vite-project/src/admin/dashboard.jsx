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

function Dash() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    const navItems = [
        { key: 'dashboard',   label: 'Dashboard',    Icon: BarChart3  },
        { key: 'estoque',     label: 'Estoque',       Icon: Package    },
        { key: 'faturacao',   label: 'Faturação',     Icon: DollarSign },
        { key: 'configuracao',label: 'Configuração',  Icon: Settings   },
    ];

    const tabTitles = {
        dashboard:    'Dashboard',
        estoque:      'Estoque',
        faturacao:    'Faturação',
        configuracao: 'Configuração',
    };

    const NavContent = () => (
        <>
            <div className="space-y-8">
                <h1 className="text-3xl text-slate-100 font-bold">M74</h1>
                <nav className="space-y-2 grid grid-cols-1 text-start">
                    {navItems.map(({ key, label, Icon }) => (
                        <button
                            key={key}
                            onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
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
                onClick={logout}
                className="flex items-center gap-2 w-full py-2 px-4 rounded-md text-white border border-slate-600 hover:bg-slate-700 transition duration-300"
            >
                <LogOut className="w-4 h-4" />
                Sair
            </button>
        </>
    );

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col md:grid md:grid-cols-6">

            {/* ── Sidebar desktop ── */}
            <aside className="hidden md:flex flex-col justify-between bg-slate-800 p-7">
                <NavContent />
            </aside>

            {/* ── Drawer mobile ── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="w-64 bg-slate-800 p-7 flex flex-col justify-between shadow-2xl">
                        <NavContent />
                    </div>
                    <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* ── Conteúdo principal ── */}
            <div className="col-span-5 flex flex-col h-screen overflow-hidden">

                {/* Header */}
                <header className="flex w-full p-4 justify-between items-center bg-white shadow-sm shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Hambúrguer mobile */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen
                                ? <X className="w-5 h-5 text-slate-700" />
                                : <Menu className="w-5 h-5 text-slate-700" />
                            }
                        </button>
                        <Title Title={tabTitles[activeTab]} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Infouser
                            Nome={user?.name || 'Utilizador'}
                            user="Administrador"
                        />
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {getInitials(user?.name)}
                        </div>
                    </div>
                </header>

                <hr className="border-slate-200 shrink-0" />

                {/* Conteúdo com scroll */}
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
