import { Trash2, Edit, Plus, Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/useAuth";
import { api } from "../services/api";

function EstoqueContent() {
    const { token } = useAuth();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nome: '', categoria: '', preco: '', quantidade: '', status: 'Ativo'
    });

    const categorias = ['Eletrônicos', 'Acessórios', 'Periféricos', 'Software', 'Serviços'];

    const loadProdutos = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.getProdutos(token);
            setProdutos(res.data);
        } catch (err) {
            setError(err.message || 'Erro ao carregar produtos');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) loadProdutos();
    }, [token, loadProdutos]);

    const handleAdd = () => {
        setEditingId(null);
        setFormData({ nome: '', categoria: '', preco: '', quantidade: '', status: 'Ativo' });
        setShowModal(true);
    };

    const handleEdit = (p) => {
        setEditingId(p.id);
        setFormData({ nome: p.nome, categoria: p.categoria, preco: p.preco, quantidade: p.quantidade, status: p.status });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.nome || !formData.categoria || !formData.preco || !formData.quantidade) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }
        const payload = {
            nome: formData.nome,
            categoria: formData.categoria,
            preco: Number(formData.preco),
            quantidade: Number(formData.quantidade),
            status: formData.status
        };
        try {
            if (editingId) {
                await api.updateProduto(token, editingId, payload);
            } else {
                await api.addProduto(token, payload);
            }
            await loadProdutos();
            setShowModal(false);
        } catch (err) {
            alert(err.message || 'Erro ao salvar produto');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja remover este produto?')) {
            try {
                await api.deleteProduto(token, id);
                await loadProdutos();
            } catch (err) {
                alert(err.message || 'Erro ao remover produto');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Ativo': return 'bg-green-100 text-green-800';
            case 'Baixo': return 'bg-yellow-100 text-yellow-800';
            case 'Crítico': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const produtosFiltrados = produtos.filter(p =>
        (p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.categoria.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterCategoria || p.categoria === filterCategoria)
    );

    return (
        <section className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">Gestão de Estoque</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
                </div>
                <select
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas as Categorias</option>
                    {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">{error}</div>
            )}

            {/* Tabela */}
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
                        {produtosFiltrados.length > 0 ? produtosFiltrados.map((p) => (
                            <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-semibold text-slate-800">{p.nome}</td>
                                <td className="px-6 py-4 text-slate-600">{p.categoria}</td>
                                <td className="px-6 py-4 text-center font-bold text-slate-800">{p.quantidade}</td>
                                <td className="px-6 py-4 text-right text-slate-800 font-semibold">{Number(p.preco).toLocaleString('pt-AO')} kz</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(p.status)}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center flex justify-center gap-2">
                                    <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                    {loading ? 'Carregando...' : 'Nenhum produto encontrado'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumo */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Total de Produtos</p>
                    <p className="text-2xl font-bold text-blue-600">{produtosFiltrados.length}</p>
                </div>
                <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Baixo Estoque</p>
                    <p className="text-2xl font-bold text-yellow-600">{produtosFiltrados.filter(p => p.status === 'Baixo').length}</p>
                </div>
                <div className="bg-linear-to-br from-red-50 to-red-100 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">Estoque Crítico</p>
                    <p className="text-2xl font-bold text-red-600">{produtosFiltrados.filter(p => p.status === 'Crítico').length}</p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingId ? 'Editar Produto' : 'Novo Produto'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input type="text" placeholder="Nome do Produto" value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <select value={formData.categoria}
                                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Selecione Categoria</option>
                                {categorias.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <input type="number" placeholder="Preço" value={formData.preco}
                                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="number" placeholder="Quantidade" value={formData.quantidade}
                                onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <select value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Ativo</option>
                                <option>Baixo</option>
                                <option>Crítico</option>
                            </select>
                        </div>
                        <div className="flex gap-3 p-6 border-t border-slate-200">
                            <button onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                                Cancelar
                            </button>
                            <button onClick={handleSave}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default EstoqueContent;
