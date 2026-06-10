import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Trash2, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { api } from '../services/api';
import { validations } from '../utils/validations';

function Vendas() {
  const { user, token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [vendas, setVendas] = useState([]);
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    quantidade: '',
    preco: '',
    data: new Date().toISOString().split('T')[0],
    status: 'Pendente'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canEdit = user?.role === 'admin';

  const loadVendas = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getVendas(token);
      setVendas(response.data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as vendas');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadVendas();
    }
  }, [loadVendas, token]);

  const validateForm = () => {
    const newErrors = {};

    if (validations.isEmpty(formData.cliente)) {
      newErrors.cliente = 'Cliente é obrigatório';
    }

    if (validations.isEmpty(formData.produto)) {
      newErrors.produto = 'Produto é obrigatório';
    }

    if (validations.isEmpty(formData.quantidade) || !validations.isNumber(formData.quantidade) || Number(formData.quantidade) <= 0) {
      newErrors.quantidade = 'Quantidade inválida';
    }

    if (validations.isEmpty(formData.preco) || !validations.isNumber(formData.preco) || Number(formData.preco) <= 0) {
      newErrors.preco = 'Preço inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVenda = () => {
    setEditingId(null);
    setFormData({ cliente: '', produto: '', quantidade: '', preco: '', data: new Date().toISOString().split('T')[0], status: 'Pendente' });
    setErrors({});
    setShowModal(true);
  };

  const handleEditVenda = (venda) => {
    if (!canEdit) {
      alert('Apenas administradores podem editar vendas.');
      return;
    }

    setEditingId(venda.id);
    setFormData({
      cliente: venda.cliente,
      produto: venda.produto,
      quantidade: venda.quantidade,
      preco: venda.preco,
      data: venda.data,
      status: venda.status
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = {
      cliente: formData.cliente,
      produto: formData.produto,
      quantidade: Number(formData.quantidade),
      preco: Number(formData.preco),
      data: formData.data,
      status: formData.status
    };

    try {
      if (editingId) {
        await api.updateVenda(token, editingId, payload);
      } else {
        await api.addVenda(token, payload);
      }
      await loadVendas();
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Erro ao salvar venda.');
    }
  };

  const handleDeleteVenda = async (id) => {
    if (!canEdit) {
      alert('Apenas administradores podem cancelar vendas.');
      return;
    }

    if (confirm('Tem certeza que deseja cancelar esta venda?')) {
      try {
        await api.deleteVenda(token, id);
        await loadVendas();
      } catch (err) {
        alert(err.message || 'Erro ao cancelar venda.');
      }
    }
  };

  const vendasFiltradas = vendas.filter((v) =>
    v.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.produto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVendas = vendasFiltradas.reduce((sum, v) => sum + Number(v.total), 0);
  const vendasConcluidas = vendasFiltradas.filter((v) => v.status === 'Concluído').length;

  const getStatusColor = (status) => {
    return status === 'Concluído'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">Vendas</h1>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {vendasFiltradas.length}
            </span>
          </div>
          <button
            onClick={handleAddVenda}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-5 h-5" />
            Nova Venda
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Total de Vendas</p>
            <p className="text-3xl font-bold text-purple-600">{totalVendas.toLocaleString('pt-AO')} kz</p>
            <p className="text-slate-500 text-xs mt-2">{vendasFiltradas.length} transações</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Vendas Concluídas</p>
            <p className="text-3xl font-bold text-green-600">{vendasConcluidas}</p>
            <p className="text-slate-500 text-xs mt-2">{((vendasConcluidas / (vendasFiltradas.length || 1)) * 100).toFixed(0)}% taxa de conclusão</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-semibold mb-2">Ticket Médio</p>
            <p className="text-3xl font-bold text-blue-600">
              {(totalVendas / (vendasFiltradas.length || 1)).toLocaleString('pt-AO', { maximumFractionDigits: 0 })} kz
            </p>
            <p className="text-slate-500 text-xs mt-2">por transação</p>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por cliente ou produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>
          {!canEdit && (
            <p className="mt-3 text-sm text-slate-500">Apenas administradores podem editar ou cancelar vendas.</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Cliente</th>
                <th className="px-6 py-4 text-left">Produto</th>
                <th className="px-6 py-4 text-center">Quantidade</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-left">Data</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendasFiltradas.length > 0 ? (
                vendasFiltradas.map((venda) => (
                  <tr key={venda.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-800">{venda.cliente}</td>
                    <td className="px-6 py-4 text-slate-600">{venda.produto}</td>
                    <td className="px-6 py-4 text-center text-slate-800">{venda.quantidade}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{venda.total.toLocaleString('pt-AO')} kz</td>
                    <td className="px-6 py-4 text-slate-600">{new Date(venda.data).toLocaleDateString('pt-AO')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(venda.status)}`}>
                        {venda.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditVenda(venda)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        disabled={!canEdit}
                      >
                        <TrendingUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteVenda(venda.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        disabled={!canEdit}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    {loading ? 'Carregando vendas...' : 'Nenhuma venda encontrada'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Editar Venda' : 'Registrar Venda'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Cliente */}
              <div>
                <input
                  type="text"
                  placeholder="Cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.cliente ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-purple-500'
                  }`}
                />
                {errors.cliente && <p className="text-sm text-red-600 mt-1">{errors.cliente}</p>}
              </div>

              {/* Produto */}
              <div>
                <input
                  type="text"
                  placeholder="Produto"
                  value={formData.produto}
                  onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.produto ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-purple-500'
                  }`}
                />
                {errors.produto && <p className="text-sm text-red-600 mt-1">{errors.produto}</p>}
              </div>

              {/* Quantidade */}
              <div>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.quantidade ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-purple-500'
                  }`}
                />
                {errors.quantidade && <p className="text-sm text-red-600 mt-1">{errors.quantidade}</p>}
              </div>

              {/* Preço */}
              <div>
                <input
                  type="number"
                  placeholder="Preço Unitário"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.preco ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-purple-500'
                  }`}
                />
                {errors.preco && <p className="text-sm text-red-600 mt-1">{errors.preco}</p>}
              </div>

              {/* Data */}
              <div>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Status */}
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Pendente</option>
                <option>Concluído</option>
                <option>Cancelado</option>
              </select>
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
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
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

export default Vendas;
