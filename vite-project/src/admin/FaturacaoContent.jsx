import { useState, useEffect, useCallback } from "react";
import { Download, Eye, Search, X } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
import { api } from "../services/api";

// ─── Utilitário CSV ────────────────────────────────────────────────────────────
function exportarCSV(vendas) {
    const cabecalho = ["Nº", "Cliente", "Produto", "Quantidade", "Preço Unit. (kz)", "Total (kz)", "Data", "Funcionário", "Status"];

    const linhas = vendas.map((v, i) => [
        i + 1,
        v.cliente,
        v.produto,
        v.quantidade,
        Number(v.preco).toFixed(2),
        Number(v.total).toFixed(2),
        new Date(v.data).toLocaleDateString("pt-AO"),
        v.funcionario || "—",
        v.status
    ]);

    // BOM para o Excel reconhecer UTF-8
    const bom = "\uFEFF";
    const conteudo = bom + [cabecalho, ...linhas]
        .map(row => row.map(cel => `"${String(cel).replace(/"/g, '""')}"`).join(";"))
        .join("\n");

    const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const data = new Date().toISOString().slice(0, 10);

    link.href     = url;
    link.download = `relatorio-faturacao-${data}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}
// ──────────────────────────────────────────────────────────────────────────────

function FaturacaoContent() {
    const { token } = useAuth();
    const [vendas, setVendas]             = useState([]);
    const [loading, setLoading]           = useState(true);
    const [searchTerm, setSearchTerm]     = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");
    const [detalhe, setDetalhe]           = useState(null); // venda em detalhe

    const loadVendas = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.getVendas(token);
            setVendas(res.data);
        } catch {
            setVendas([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) loadVendas();
    }, [token, loadVendas]);

    const vendasFiltradas = vendas.filter(v => {
        const termo = searchTerm.toLowerCase();
        const matchBusca =
            v.cliente?.toLowerCase().includes(termo) ||
            v.produto?.toLowerCase().includes(termo) ||
            (v.funcionario || "").toLowerCase().includes(termo);
        const matchStatus = !filtroStatus || v.status === filtroStatus;
        return matchBusca && matchStatus;
    });

    const totalGeral       = vendasFiltradas.reduce((s, v) => s + Number(v.total), 0);
    const totalPago        = vendasFiltradas.filter(v => v.status === "Concluído").reduce((s, v) => s + Number(v.total), 0);
    const totalPendente    = vendasFiltradas.filter(v => v.status === "Pendente").reduce((s, v) => s + Number(v.total), 0);
    const totalCancelado   = vendasFiltradas.filter(v => v.status === "Cancelado").reduce((s, v) => s + Number(v.total), 0);

    const getStatusColor = (status) => {
        if (status === "Concluído") return "bg-green-100 text-green-800";
        if (status === "Cancelado") return "bg-red-100 text-red-800";
        return "bg-yellow-100 text-yellow-800";
    };

    return (
        <section className="p-4 md:p-6 space-y-6">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Faturação</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Relatório de vendas registadas</p>
                </div>
                <button
                    onClick={() => exportarCSV(vendasFiltradas)}
                    disabled={vendasFiltradas.length === 0}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold"
                >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </button>
            </div>

            {/* ── Cards de Resumo ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border-l-4 border-blue-600 shadow-sm">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Total Geral</p>
                    <p className="text-xl font-bold text-blue-600 mt-1">{totalGeral.toLocaleString("pt-AO")} kz</p>
                    <p className="text-slate-400 text-xs mt-1">{vendasFiltradas.length} transações</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-l-4 border-green-600 shadow-sm">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Concluídas</p>
                    <p className="text-xl font-bold text-green-600 mt-1">{totalPago.toLocaleString("pt-AO")} kz</p>
                    <p className="text-slate-400 text-xs mt-1">{vendasFiltradas.filter(v => v.status === "Concluído").length} vendas</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-l-4 border-yellow-500 shadow-sm">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Pendentes</p>
                    <p className="text-xl font-bold text-yellow-600 mt-1">{totalPendente.toLocaleString("pt-AO")} kz</p>
                    <p className="text-slate-400 text-xs mt-1">{vendasFiltradas.filter(v => v.status === "Pendente").length} vendas</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-l-4 border-red-500 shadow-sm">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Canceladas</p>
                    <p className="text-xl font-bold text-red-600 mt-1">{totalCancelado.toLocaleString("pt-AO")} kz</p>
                    <p className="text-slate-400 text-xs mt-1">{vendasFiltradas.filter(v => v.status === "Cancelado").length} vendas</p>
                </div>
            </div>

            {/* ── Filtros ── */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar por cliente, produto ou funcionário..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={filtroStatus}
                    onChange={e => setFiltroStatus(e.target.value)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="">Todos os status</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>

            {/* ── Tabela desktop ── */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-800 text-white text-sm">
                                <tr>
                                    <th className="px-5 py-3 text-left">Cliente</th>
                                    <th className="px-5 py-3 text-left">Produto</th>
                                    <th className="px-5 py-3 text-center">Qtd</th>
                                    <th className="px-5 py-3 text-right">Total (kz)</th>
                                    <th className="px-5 py-3 text-left">Data</th>
                                    <th className="px-5 py-3 text-left">Funcionário</th>
                                    <th className="px-5 py-3 text-center">Status</th>
                                    <th className="px-5 py-3 text-center">Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasFiltradas.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-5 py-12 text-center text-slate-500 text-sm">
                                            Nenhuma venda encontrada
                                        </td>
                                    </tr>
                                ) : vendasFiltradas.map(v => (
                                    <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50 transition text-sm">
                                        <td className="px-5 py-3 font-semibold text-slate-800">{v.cliente}</td>
                                        <td className="px-5 py-3 text-slate-600">{v.produto}</td>
                                        <td className="px-5 py-3 text-center text-slate-600">{v.quantidade}</td>
                                        <td className="px-5 py-3 text-right font-bold text-slate-800">{Number(v.total).toLocaleString("pt-AO")}</td>
                                        <td className="px-5 py-3 text-slate-600">{new Date(v.data).toLocaleDateString("pt-AO")}</td>
                                        <td className="px-5 py-3 text-slate-600">{v.funcionario || "—"}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <button
                                                onClick={() => setDetalhe(v)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                                                title="Ver detalhe"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Cards mobile ── */}
                    <div className="md:hidden space-y-3">
                        {vendasFiltradas.length === 0 ? (
                            <p className="text-center text-slate-500 py-8 text-sm">Nenhuma venda encontrada</p>
                        ) : vendasFiltradas.map(v => (
                            <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-bold text-slate-800">{v.cliente}</p>
                                        <p className="text-slate-500 text-sm">{v.produto}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                                        {v.status}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-600 space-y-1 mt-3">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span className="font-bold text-blue-600">{Number(v.total).toLocaleString("pt-AO")} kz</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Data</span>
                                        <span>{new Date(v.data).toLocaleDateString("pt-AO")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Funcionário</span>
                                        <span>{v.funcionario || "—"}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDetalhe(v)}
                                    className="mt-3 w-full flex items-center justify-center gap-2 text-blue-600 text-sm border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition"
                                >
                                    <Eye className="w-4 h-4" /> Ver detalhe
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ── Rodapé com total ── */}
            {!loading && vendasFiltradas.length > 0 && (
                <div className="bg-slate-800 text-white px-5 py-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="font-semibold">
                        Total filtrado — {vendasFiltradas.length} transação(ões)
                    </span>
                    <span className="text-2xl font-black">{totalGeral.toLocaleString("pt-AO")} kz</span>
                </div>
            )}

            {/* ── Modal de detalhe ── */}
            {detalhe && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">Detalhe da Venda</h3>
                            <button onClick={() => setDetalhe(null)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-3 text-sm">
                            {[
                                ["Cliente",      detalhe.cliente],
                                ["Produto",      detalhe.produto],
                                ["Quantidade",   detalhe.quantidade],
                                ["Preço unit.",  `${Number(detalhe.preco).toLocaleString("pt-AO")} kz`],
                                ["Total",        `${Number(detalhe.total).toLocaleString("pt-AO")} kz`],
                                ["Data",         new Date(detalhe.data).toLocaleDateString("pt-AO")],
                                ["Funcionário",  detalhe.funcionario || "—"],
                                ["Status",       detalhe.status],
                            ].map(([label, valor]) => (
                                <div key={label} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-500 font-medium">{label}</span>
                                    <span className="font-semibold text-slate-800">{valor}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => exportarCSV([detalhe])}
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition"
                            >
                                <Download className="w-4 h-4" />
                                Exportar esta venda
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default FaturacaoContent;
