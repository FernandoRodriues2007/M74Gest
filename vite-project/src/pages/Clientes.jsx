import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { api } from '../services/api';
import { validations } from '../utils/validations';
import { getInitials } from '../utils/avatar';

function Clientes() {
  const { user, token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nif: '',
    cidade: '',
    status: 'Ativo'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canDelete = user?.role === 'admin';

  useEffect(() => {
    if (token) {
      loadClientes();
    }
  }, [token]);

  const loadClientes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getClientes(token);
      setClientes(response.data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os clientes');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (validations.isEmpty(formData.nome)) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (validations.isEmpty(formData.email)) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validations.email(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (validations.isEmpty(formData.telefone)) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validations.phone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido (9 dígitos)';
    }

    if (validations.isEmpty(formData.nif)) {
      newErrors.nif = 'NIF é obrigatório';
    } else if (!validations.nif(formData.nif)) {
      newErrors.nif = 'NIF inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCliente = () => {
    setEditingId(null);
    setFormData({ nome: '', email: '', telefone: '', nif: '', cidade: '', status: 'Ativo' });
    setErrors({});
    setShowModal(true);
  };

  const handleEditCliente = (cliente) => {
    setEditingId(cliente.id);
    setFormData(cliente);
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (editingId) {
        await api.updateCliente(token, editingId, formData);
      } else {
        await api.addCliente(token, formData);
      }
      await loadClientes();
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Erro ao salvar cliente');
    }
  };

  const handleDeleteCliente = async (id) => {
    if (!canDelete) {
      alert('Apenas administradores podem deletar clientes.');
      return;
    }
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await api.deleteCliente(token, id);
        await loadClientes();
      } catch (err) {
        alert(err.message || 'Erro ao deletar cliente');
      }
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {clientesFiltrados.length}
            </span>
          </div>
          <button
            onClick={handleAddCliente}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            Novo Cliente
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>
          {!canDelete && (
            <p className="mt-3 text-sm text-slate-500">Apenas administradores podem remover clientes.</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {clientesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientesFiltrados.map((cliente) => (
              <div key={cliente.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {getInitials(cliente.nome)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cliente.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 mb-1">{cliente.nome}</h3>
                <p className="text-slate-500 text-sm mb-3">{cliente.cidade}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    {cliente.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    {cliente.telefone}
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold">NIF:</span> {cliente.nif}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleEditCliente(cliente)}
                    className="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteCliente(cliente.id)}
                    className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-slate-500">{loading ? 'Carregando clientes...' : 'Nenhum cliente encontrado'}</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-700 text-2xl">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-green-500'
                  }`}
                />
                {errors.nome && <p className="text-sm text-red-600 mt-1">{errors.nome}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-green-500'
                  }`}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Telefone (9 dígitos)"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.telefone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-green-500'
                  }`}
                />
                {errors.telefone && <p className="text-sm text-red-600 mt-1">{errors.telefone}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="NIF"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.nif ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-green-500'
                  }`}
                />
                {errors.nif && <p className="text-sm text-red-600 mt-1">{errors.nif}</p>}
              </div>

              <input
                type="text"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
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

export default Clientes;
