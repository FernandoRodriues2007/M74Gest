import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { api } from '../services/api';

function ClienteHistorico() {
  const { user, token } = useAuth();
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadHistorico = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getVendas(token);
      // Filtrar apenas as compras deste cliente
      const minhas = res.data.filter(v =>
        v.cliente?.toLowerCase() === user?.name?.toLowerCase()
      );
      setVendas(minhas);
    } catch {
      setVendas([]);
    } finally {
      setLoading(false);
    }
  }, [token, user?.name]);

  useEffect(() => {
    if (token) loadHistorico();
  }, [token, loadHistorico]);

  const getStatusColor = (status) => {
    if (status === 'Concluído') return 'bg-green-100 text-green-700';
    if (status === 'Cancelado') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const filtradas = vendas.filter(v =>
    v.produto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = filtradas.reduce((s, v) => s + Number(v.total), 0);

  return (
    <section className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Histórico de Compras</h2>
        <p className="text-slate-500 text-sm mt-1">Todas as suas compras registadas</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border-l-4 border-blue-600 shadow-sm">
          <p className="text-slate-500 text-xs font-semibold uppercase">Total gasto</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{total.toLocaleString('pt-AO')} kz</p>
        </div>
        <div className="bg-white rounded-xl p-4 border-l-4 border-purple-600 shadow-sm">
          <p className="text-slate-500 text-xs font-semibold uppercase">Compras</p>
          <p className="text-xl font-bold text-purple-600 mt-1">{filtradas.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border-l-4 border-green-600 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-slate-500 text-xs font-semibold uppercase">Concluídas</p>
          <p className="text-xl font-bold text-green-600 mt-1">
            {filtradas.filter(v => v.status === 'Concluído').length}
          </p>
        </div>
      </div>

      {/* Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar por produto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabela — desktop */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : filtradas.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>Nenhuma compra encontrada</p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800 text-white text-sm">
                <tr>
                  <th className="px-5 py-3 text-left">Produto</th>
                  <th className="px-5 py-3 text-center">Qtd</th>
                  <th className="px-5 py-3 text-right">Total</th>
                  <th className="px-5 py-3 text-left">Data</th>
                  <th className="px-5 py-3 text-left">Funcionário</th>
                  <th className="px-5 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map(v => (
                  <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50 transition text-sm">
                    <td className="px-5 py-3 font-semibold text-slate-800">{v.produto}</td>
                    <td className="px-5 py-3 text-center text-slate-600">{v.quantidade}</td>
                    <td className="px-5 py-3 text-right font-bold text-slate-800">{Number(v.total).toLocaleString('pt-AO')} kz</td>
                    <td className="px-5 py-3 text-slate-600">{new Date(v.data).toLocaleDateString('pt-AO')}</td>
                    <td className="px-5 py-3 text-slate-600">{v.funcionario || '—'}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile — cards */}
          <div className="md:hidden space-y-3">
            {filtradas.map(v => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-slate-800">{v.produto}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                    {v.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Quantidade</span><span className="font-semibold">{v.quantidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span><span className="font-bold text-blue-600">{Number(v.total).toLocaleString('pt-AO')} kz</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data</span><span>{new Date(v.data).toLocaleDateString('pt-AO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Funcionário</span><span>{v.funcionario || '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ClienteHistorico;
