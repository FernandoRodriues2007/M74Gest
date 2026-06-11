import { Package, DollarSign, ShoppingCart, AlertTriangle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { api } from "../services/api";

function DashboardContent() {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        totalProdutos: 0,
        totalClientes: 0,
        totalVendas: 0,
        receitaTotal: 0,
        vendasRecentes: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        api.getDashboardStats(token)
            .then(res => {
                if (res.success) setStats(res.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <section className="col-span-5">
            <div className="w-full p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card Produtos */}
                <div className="bg-slate-50 p-4 rounded-lg text-start hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <Package className="w-7 h-7 fill-slate-800 text-slate-50" />
                        <p className="text-green-400 font-semibold">stock</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{stats.totalProdutos}</h3>
                    <p className="text-slate-600">Total produtos</p>
                </div>

                {/* Card Receita */}
                <div className="bg-slate-50 p-4 rounded-lg text-start hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <DollarSign className="w-7 h-7 fill-slate-800 text-slate-800" />
                        <p className="text-green-400 font-semibold">kz</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                        {Number(stats.receitaTotal).toLocaleString('pt-AO')} kz
                    </h3>
                    <p className="text-slate-600">Receita total</p>
                </div>

                {/* Card Vendas */}
                <div className="bg-slate-50 p-4 rounded-lg text-start hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <ShoppingCart className="w-7 h-7 fill-slate-800 text-slate-800" />
                        <p className="text-blue-400 font-semibold">total</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{stats.totalVendas}</h3>
                    <p className="text-slate-600">Vendas</p>
                </div>

                {/* Card Clientes */}
                <div className="bg-slate-50 p-4 rounded-lg text-start hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <Users className="w-7 h-7 text-slate-800" />
                        <p className="text-purple-400 font-semibold">ativos</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{stats.totalClientes}</h3>
                    <p className="text-slate-600">Clientes</p>
                </div>

                {/* Vendas Recentes */}
                <div className="bg-slate-50 p-4 rounded-lg col-span-2 text-start hover:shadow-lg transition duration-300">
                    <h4 className="text-slate-800 mb-4 font-bold text-lg">Vendas Recentes</h4>
                    {stats.vendasRecentes.length > 0 ? (
                        <ul className="space-y-2">
                            {stats.vendasRecentes.map(v => (
                                <li key={v.id} className="flex justify-between text-sm">
                                    <span className="text-slate-700 font-semibold">{v.cliente} — {v.produto}</span>
                                    <span className="text-slate-800 font-bold">{Number(v.total).toLocaleString('pt-AO')} kz</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-sm">Nenhuma venda registrada ainda.</p>
                    )}
                </div>

                {/* Resumo */}
                <div className="bg-slate-50 p-4 rounded-lg col-span-2 text-start hover:shadow-lg transition duration-300">
                    <h4 className="text-slate-800 mb-4 font-bold text-lg">Resumo do Sistema</h4>
                    <ul className="text-slate-700 space-y-3 list-disc pl-5">
                        <li className="marker:text-green-400">{stats.totalProdutos} produto(s) em stock</li>
                        <li className="marker:text-blue-400">{stats.totalVendas} venda(s) registrada(s)</li>
                        <li className="marker:text-purple-400">{stats.totalClientes} cliente(s) cadastrado(s)</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default DashboardContent;
