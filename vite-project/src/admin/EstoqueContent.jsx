import { Trash2, Edit, Plus, Search } from "lucide-react";
import { useState } from "react";

function EstoqueContent() {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: "Produto A", categoria: "Eletrônicos", quantidade: 150, preco: 1200, status: "Ativo" },
        { id: 2, nome: "Produto B", categoria: "Roupas", quantidade: 45, preco: 350, status: "Baixo" },
        { id: 3, nome: "Produto C", categoria: "Alimentos", quantidade: 250, preco: 75, status: "Ativo" },
        { id: 4, nome: "Produto D", categoria: "Eletrônicos", quantidade: 10, preco: 2500, status: "Crítico" },
        { id: 5, nome: "Produto E", categoria: "Livros", quantidade: 320, preco: 450, status: "Ativo" },
    ]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Ativo': return 'bg-green-100 text-green-800';
            case 'Baixo': return 'bg-yellow-100 text-yellow-800';
            case 'Crítico': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <section className="p-6 space-y-6">
            {/* Header com Botão */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">Gestão de Estoque</h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    <Plus className="w-5 h-5" />
                    Adicionar Produto
                </button>
            </div>

            {/* Barra de Pesquisa */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        placeholder="Pesquisar produtos..." 
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
                </div>
                <select className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Todas as Categorias</option>
                    <option>Eletrônicos</option>
                    <option>Roupas</option>
                    <option>Alimentos</option>
                    <option>Livros</option>
                </select>
            </div>

            {/* Tabela de Produtos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">Produto</th>
                            <th className="px-6 py-4 text-left">Categoria</th>
                            <th className="px-6 py-4 text-center">Quantidade</th>
                            <th className="px-6 py-4 text-right">Preço</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-semibold text-slate-800">{produto.nome}</td>
                                <td className="px-6 py-4 text-slate-600">{produto.categoria}</td>
                                <td className="px-6 py-4 text-center font-bold text-slate-800">{produto.quantidade}</td>
                                <td className="px-6 py-4 text-right text-slate-800 font-semibold">{produto.preco.toLocaleString('pt-AO')} kz</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(produto.status)}`}>
                                        {produto.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center flex justify-center gap-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resumo */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Total de Produtos</p>
                    <p className="text-2xl font-bold text-blue-600">{produtos.length}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Produtos com Baixo Estoque</p>
                    <p className="text-2xl font-bold text-yellow-600">{produtos.filter(p => p.status === 'Baixo').length}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Estoque Crítico</p>
                    <p className="text-2xl font-bold text-red-600">{produtos.filter(p => p.status === 'Crítico').length}</p>
                </div>
            </div>
        </section>
    );
}

export default EstoqueContent;
