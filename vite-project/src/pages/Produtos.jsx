import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { api } from '../services/api';

function Produtos() {
  const { user, token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({ nome: '', categoria: '', preco: '', quantidade: '', status: 'Ativo' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categorias = ['Eletrônicos', 'Acessórios', 'Periféricos', 'Software', 'Serviços'];
  const canManage = user?.role === 'admin';

  const loadProdutos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getProdutos(token);
      setProdutos(response.data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os produtos');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadProdutos();
    }
  }, [token, loadProdutos]);

  const handleAddProduto = () => {
    if (!canManage) {
      alert('Apenas administradores podem adicionar produtos.');
      return;
    }
    setEditingId(null);
    setFormData({ nome: '', categoria: '', preco: '', quantidade: '', status: 'Ativo' });
    setShowModal(true);
  };

  const handleEditProduto = (produto) => {
    if (!canManage) {
      alert('Apenas administradores podem editar produtos.');
      return;
    }
    setEditingId(produto.id);
    setFormData({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      quantidade: produto.quantidade,
      status: produto.status
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.categoria || !formData.preco || !formData.quantidade) {
      alert('Preencha todos os campos');
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

  const handleDeleteProduto = async (id) => {
    if (!canManage) {
      alert('Apenas administradores podem remover produtos.');
      return;
    }
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await api.deleteProduto(token, id);
        await loadProdutos();
      } catch (err) {
        alert(err.message || 'Erro ao deletar produto');
      }
    }
  };

  const produtosFiltrados = produtos.filter((p) =>
    (p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterCategory || p.categoria === filterCategory)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Baixo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Crítico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {produtosFiltrados.length}
            </span>
          </div>
          <button
            onClick={handleAddProduto}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!canManage}
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Pesquisar por nome ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas as Categorias</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {!canManage && (
            <div className="text-sm text-slate-500">
              Você pode visualizar produtos. Apenas administradores podem criar, editar e deletar itens.
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Produto</th>
                <th className="px-6 py-4 text-left">Categoria</th>
                <th className="px-6 py-4 text-right">Preço</th>
                <th className="px-6 py-4 text-center">Quantidade</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-800">{produto.nome}</td>
                    <td className="px-6 py-4 text-slate-600">{produto.categoria}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{Number(produto.preco).toLocaleString('pt-AO')} kz</td>
                    <td className="px-6 py-4 text-center text-slate-800">{produto.quantidade}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(produto.status)}`}>
                        {produto.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleEditProduto(produto)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        disabled={!canManage}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduto(produto.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        disabled={!canManage}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    {loading ? 'Carregando produtos...' : 'Nenhum produto encontrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Nome do Produto"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione Categoria</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Preço"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Produtos;
