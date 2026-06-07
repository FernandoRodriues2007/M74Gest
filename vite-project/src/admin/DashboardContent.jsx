import { Package, DollarSign, ShoppingCart, AlertTriangle } from "lucide-react";

function DashboardContent() {
    return (
        <section className="col-span-5">
            <div className="w-full p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card Produtos */}
                <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <Package className="w-7 h-7 fill-slate-800 text-slate-50" />
                        <p className="text-green-400 font-semibold">+12%</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">1,247</h3>
                    <p className="text-slate-600">Total produtos</p>
                </div>

                {/* Card Receita */}
                <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <DollarSign className="w-7 h-7 fill-slate-800 text-slate-800" />
                        <p className="text-green-400 font-semibold">+8%</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">42.000 kz</h3>
                    <p className="text-slate-600">Receita mensal</p>
                </div>

                {/* Card Vendas */}
                <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <ShoppingCart className="w-7 h-7 fill-slate-800 text-slate-800" />
                        <p className="text-blue-400 font-semibold">+5%</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">326</h3>
                    <p className="text-slate-600">Vendas</p>
                </div>

                {/* Card Baixo Estoque */}
                <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                    <div className="flex justify-between mb-2">
                        <AlertTriangle className="w-7 h-7 fill-slate-800 text-slate-50" />
                        <p className="text-red-400 font-semibold">23</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Baixo Estoque</h3>
                    <p className="text-slate-600">Produtos</p>
                </div>

                {/* Produtos Mais Vendidos */}
                <div className="bg-slate-50 p-4 rounded-lg col-span-2 text-start hover:shadow-lg transition duration-300">
                    <h4 className="text-slate-800 mb-4 font-bold text-lg">Produtos mais vendidos</h4>
                    <ul className="flex justify-between gap-8">
                        <ul className="space-y-3 flex-1">
                            <li className="text-slate-700 font-semibold">Produto A</li>
                            <li className="text-slate-700 font-semibold">Produto B</li>
                            <li className="text-slate-700 font-semibold">Produto C</li>
                        </ul>
                        <ul className="space-y-3 flex-1 text-right">
                            <li className="text-slate-800 font-bold">50 unidades</li>
                            <li className="text-slate-800 font-bold">30 unidades</li>
                            <li className="text-slate-800 font-bold">20 unidades</li>
                        </ul>
                    </ul>
                </div>

                {/* Atividade Recente */}
                <div className="bg-slate-50 p-4 rounded-lg col-span-2 text-start hover:shadow-lg transition duration-300">
                    <h4 className="text-slate-800 mb-4 font-bold text-lg">Atividade Recente</h4>
                    <ul className="text-slate-700 space-y-3 list-disc pl-5">
                        <li className="marker:text-green-400">Produto adicionado ao estoque</li>
                        <li className="marker:text-blue-400">Nova venda registrada</li>
                        <li className="marker:text-yellow-400">Alerta de baixo estoque</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default DashboardContent;
