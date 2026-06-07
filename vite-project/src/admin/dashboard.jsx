import { useState } from "react";
import Links from "../components/links";
import Infouser from "../components/infoUser";
import { UserCircle, Package, DollarSign, ShoppingCart, AlertTriangle ,Settings,BarChart3} from "lucide-react";
import Title from "../components/Title";
import DashboardContent from "./DashboardContent";
import EstoqueContent from "./EstoqueContent";
import FaturacaoContent from "./FaturacaoContent";
import ConfiguracaoContent from "./ConfiguracaoContent";

function Dash() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="text-center bg-slate-100 grid md:grid-cols-6">
            <div className="hidden md:block bg-slate-800 space-y-10  p-7">
                <h1 className="text-start text-3xl text-slate-100 font-bold">M74</h1>
                    <nav className="space-y-8 grid grid-cols-1 text-start">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex gap-4 items-center p-3 rounded-md transition duration-700 ${
                                activeTab === 'dashboard'
                                    ? 'bg-white text-slate-800 font-bold'
                                    : 'text-white hover:text-slate-800 hover:bg-white'
                            }`}
                        >
                            <BarChart3 className="w-5 h-5" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('estoque')}
                            className={`flex gap-4 items-center p-3 rounded-md transition duration-700 ${
                                activeTab === 'estoque'
                                    ? 'bg-white text-slate-800 font-bold'
                                    : 'text-white hover:text-slate-800 hover:bg-white'
                            }`}
                        >
                            <Package className="w-5 h-5" />
                            Estoque
                        </button>
                        <button
                            onClick={() => setActiveTab('faturacao')}
                            className={`flex gap-4 items-center p-3 rounded-md transition duration-700 ${
                                activeTab === 'faturacao'
                                    ? 'bg-white text-slate-800 font-bold'
                                    : 'text-white hover:text-slate-800 hover:bg-white'
                            }`}
                        >
                            <DollarSign className="w-5 h-5" />
                            Faturação
                        </button>
                        <button
                            onClick={() => setActiveTab('configuracao')}
                            className={`flex gap-4 items-center p-3 rounded-md transition duration-700 ${
                                activeTab === 'configuracao'
                                    ? 'bg-white text-slate-800 font-bold'
                                    : 'text-white hover:text-slate-800 hover:bg-white'
                            }`}
                        >
                            <Settings className="w-5 h-5" />
                            Configuração
                        </button>
                    </nav>
                    <div className="grid align-bottom">
                        <Links Href="./Home" Text="Sair" />
                    </div>

                </div>

            <div className="h-screen col-span-5 overflow-y-auto">
                <header className="flex w-full p-4  justify-between bg-slate-100">
                <Title Title={activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'estoque' ? 'Estoque' : activeTab === 'faturacao' ? 'Faturação' : 'Configuração'} />
                <div className="flex space-x-8">

                    <Infouser Nome="Fernando Rodrigues" user="Administrador" />
                    <UserCircle className="w-8 h-8 text-slate-800" />
                </div>
            </header>
            <hr className=" border-slate-800" />
            <main className="min-h-screen">
                {activeTab === 'dashboard' && <DashboardContent />}
                {activeTab === 'estoque' && <EstoqueContent />}
                {activeTab === 'faturacao' && <FaturacaoContent />}
                {activeTab === 'configuracao' && <ConfiguracaoContent />}
            </main>

            </div>
            
        </div>

    )
}
export default Dash;