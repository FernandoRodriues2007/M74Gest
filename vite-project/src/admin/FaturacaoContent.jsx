import { DollarSign, Download, Eye, Search } from "lucide-react";
import { useState } from "react";

function FaturacaoContent() {
    const [faturas, setFaturas] = useState([
        { id: 1, numero: "FAT-2024-001", cliente: "João Silva", data: "2024-01-15", valor: 12500, status: "Paga", descricao: "Venda de produtos variados" },
        { id: 2, numero: "FAT-2024-002", cliente: "Maria Santos", data: "2024-01-16", valor: 8300, status: "Pendente", descricao: "Compra de eletrônicos" },
        { id: 3, numero: "FAT-2024-003", cliente: "Pedro Costa", data: "2024-01-17", valor: 15200, status: "Paga", descricao: "Fornecimento de estoque" },
        { id: 4, numero: "FAT-2024-004", cliente: "Ana Oliveira", data: "2024-01-18", valor: 5600, status: "Vencida", descricao: "Compra de roupas" },
        { id: 5, numero: "FAT-2024-005", cliente: "Carlos Mendes", data: "2024-01-19", valor: 22100, status: "Pendente", descricao: "Pedido grande de produtos" },
    ]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Paga': return 'bg-green-100 text-green-800';
            case 'Pendente': return 'bg-yellow-100 text-yellow-800';
            case 'Vencida': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getTotalPorStatus = (status) => {
        return faturas
            .filter(f => f.status === status)
            .reduce((total, f) => total + f.valor, 0);
    };

    return (
        <section className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">Faturação</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                    <Download className="w-5 h-5" />
                    Exportar Relatório
                </button>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                    <p className="text-green-600 text-sm font-semibold">Faturas Pagas</p>
                    <p className="text-3xl font-bold text-green-700">{getTotalPorStatus('Paga').toLocaleString('pt-AO')} kz</p>
                    <p className="text-green-600 text-xs mt-2">{faturas.filter(f => f.status === 'Paga').length} faturas</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                    <p className="text-yellow-600 text-sm font-semibold">Faturas Pendentes</p>
                    <p className="text-3xl font-bold text-yellow-700">{getTotalPorStatus('Pendente').toLocaleString('pt-AO')} kz</p>
                    <p className="text-yellow-600 text-xs mt-2">{faturas.filter(f => f.status === 'Pendente').length} faturas</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
                    <p className="text-red-600 text-sm font-semibold">Faturas Vencidas</p>
                    <p className="text-3xl font-bold text-red-700">{getTotalPorStatus('Vencida').toLocaleString('pt-AO')} kz</p>
                    <p className="text-red-600 text-xs mt-2">{faturas.filter(f => f.status === 'Vencida').length} faturas</p>
                </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        placeholder="Pesquisar faturas..." 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
                </div>
                <select className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Todos os Status</option>
                    <option>Paga</option>
                    <option>Pendente</option>
                    <option>Vencida</option>
                </select>
            </div>

            {/* Tabela de Faturas */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">Nº Fatura</th>
                            <th className="px-6 py-4 text-left">Cliente</th>
                            <th className="px-6 py-4 text-left">Data</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faturas.map((fatura) => (
                            <tr key={fatura.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-semibold text-blue-600">{fatura.numero}</td>
                                <td className="px-6 py-4 text-slate-800">{fatura.cliente}</td>
                                <td className="px-6 py-4 text-slate-600">{new Date(fatura.data).toLocaleDateString('pt-AO')}</td>
                                <td className="px-6 py-4 text-right font-bold text-slate-800">{fatura.valor.toLocaleString('pt-AO')} kz</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(fatura.status)}`}>
                                        {fatura.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Visualizar">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Geral */}
            <div className="bg-slate-800 text-white p-4 rounded-lg flex justify-between items-center">
                <span className="text-lg font-semibold">Total de Faturação:</span>
                <span className="text-2xl font-bold">{faturas.reduce((total, f) => total + f.valor, 0).toLocaleString('pt-AO')} kz</span>
            </div>
        </section>
    );
}

export default FaturacaoContent;
