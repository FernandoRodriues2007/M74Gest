import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Package, Search, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { api } from '../services/api';

function ClienteCompra() {
  const { user, token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadProdutos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getProdutos(token);
      setProdutos(res.data.filter(p => p.status !== 'Inativo'));
    } catch {
      setErro('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) loadProdutos();
  }, [token, loadProdutos]);

  const abrirCompra = (produto) => {
    setSelectedProduto(produto);
    setQuantidade(1);
    setErro('');
    setSucesso('');
    setShowModal(true);
  };

  const confirmarCompra = async () => {
    if (quantidade < 1) { setErro('Quantidade inválida'); return; }
    if (quantidade > selectedProduto.quantidade) {
      setErro(`Apenas ${selectedProduto.quantidade} unidade(s) em stock`);
      return;
    }

    setSubmitting(true);
    setErro('');
    try {
      await api.addVenda(token, {
        cliente: user.name,
        produto: selectedProduto.nome,
        quantidade: Number(quantidade),
        preco: selectedProduto.preco,
        data: new Date().toISOString().split('T')[0],
        status: 'Pendente'
      });
      setSucesso(`Compra de "${selectedProduto.nome}" registada com sucesso!`);
      setShowModal(false);
      loadProdutos();
    } catch (err) {
      setErro(err.message || 'Erro ao registar compra');
    } finally {
      setSubmitting(false);
    }
  };

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  const produtosFiltrados = produtos.filter(p =>
    (p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterCategoria || p.categoria === filterCategoria)
  );

  const getStatusColor = (status) => {
    if (status === 'Ativo') return 'text-green-600 bg-green-50';
    if (status === 'Baixo') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <section className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Loja</h2>
        <p className="text-slate-500 text-sm mt-1">Seleccione um produto para efectuar a sua compra</p>
      </div>

      {/* Alerta de sucesso */}
      {sucesso && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">{sucesso}</div>
          <button onClick={() => setSucesso('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Barra de pesquisa + filtro */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterCategoria}
          onChange={e => setFilterCategoria(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid de produtos */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {produtosFiltrados.map(produto => (
            <div key={produto.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{produto.categoria}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusColor(produto.status)}`}>
                  {produto.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{produto.nome}</h3>
              <p className="text-slate-500 text-xs mb-4">Stock: {produto.quantidade} unid.</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {Number(produto.preco).toLocaleString('pt-AO')} kz
                </span>
                <button
                  onClick={() => abrirCompra(produto)}
                  disabled={produto.quantidade === 0}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmação */}
      {showModal && selectedProduto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Confirmar Compra</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Resumo do produto */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Produto</span>
                  <span className="font-semibold text-slate-800">{selectedProduto.nome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Categoria</span>
                  <span className="text-slate-700">{selectedProduto.categoria}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Preço unitário</span>
                  <span className="font-bold text-blue-600">{Number(selectedProduto.preco).toLocaleString('pt-AO')} kz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Cliente</span>
                  <span className="text-slate-700">{user?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Data</span>
                  <span className="text-slate-700">{new Date().toLocaleDateString('pt-AO')}</span>
                </div>
              </div>

              {/* Quantidade */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Quantidade (max: {selectedProduto.quantidade})
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduto.quantidade}
                  value={quantidade}
                  onChange={e => setQuantidade(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Total */}
              <div className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-3">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="text-xl font-black text-blue-600">
                  {(Number(selectedProduto.preco) * quantidade).toLocaleString('pt-AO')} kz
                </span>
              </div>

              {/* Erro */}
              {erro && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {erro}
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarCompra}
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> A processar...</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Confirmar</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ClienteCompra;
