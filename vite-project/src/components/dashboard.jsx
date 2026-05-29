import Links from "./links";
import Infouser from "./infoUser";
import { UserCircle, Package, DollarSign, ShoppingCart, AlertTriangle ,Settings,BarChart3} from "lucide-react";
import Title from "./Title";
function dash() {
    return (
        <div className="text-center bg-slate-100 grid md:grid-cols-6">
            <div className="hidden md:block bg-slate-800 space-y-10  p-7">
                <h1 className="text-start text-3xl text-slate-100 font-bold">M74</h1>
                    <nav className="space-y-8 grid grid-cols-1 text-start">
                        

                        <Links Href="#" Text="Dashboard" Icon={BarChart3} />
                        <Links Href="#" Text="Estock"  Icon={Package}/>
                        <Links Href="#" Text="Faturação"  Icon={DollarSign}/>
                        <Links Href="#" Text="Configuração" Icon={Settings} />
                    </nav>
                    <div className="grid align-bottom">

                        <Links Href="./Home" Text="Sair" />
                    </div>

                </div>

            <div className="h-screen col-span-5">
                <header className="flex w-full p-4  justify-between bg-slate-100">
                <Title Title="Dashboard" />
                <div className="flex space-x-8">

                    <Infouser Nome="Fernando Rodrigues" user="Adiministador" />
                    <UserCircle className="w-8 h-8 text-slate-800" />
                </div>
            </header>
            <hr className=" border-slate-800" />
            <main className=" h-screen">
                
                <section className="col-span-5">

                    <div className="w-full  p-4 grid grid-cols-2 md:grid-cols-4  gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-start  space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                            <div className="flex justify-between mb-2">

                                <Package className="w-7 h-7 fill-slate-800 text-slate-50" />

                                <p className="text-green-400">+12%</p>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">1,247</h3>
                            <p className="text-slate-600 ">Total  produtos </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                            <div className="flex justify-between mb-2">

                                <DollarSign className="w-7 h-7 fill-slate-800 text-slate-800" />

                                <p className="text-green-400">+8%</p>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">42.000 kz</h3>
                            <p className="text-slate-600 ">Receita mensal </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8  hover:shadow-lg hover:translate-y-1 transition duration-300">
                            <div className="flex justify-between mb-2">

                                <ShoppingCart className="w-7 h-7 fill-slate-800 text-slate-800" />

                                <p className="text-blue-400">+5%</p>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">326</h3>
                            <p className="text-slate-600 ">Vendas </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-start space-x-8 hover:shadow-lg hover:translate-y-1 transition duration-300">
                            <div className="flex justify-between mb-2">

                                <AlertTriangle className="w-7 h-7 fill-slate-800 text-slate-50" />

                                <p className="text-red-400">23</p>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">Baixo Estoque</h3>
                            <p className="text-slate-600 ">Produtos </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg col-span-2 text-start text-align-center text-slate-50 " >
                            <h4 className="text-slate-800 mb-2 font-bold"> Produtos mais vendidos</h4>
                            < ul className="flex justify-between">
                                <ul className="space-y-2">
                                    <li className="text-slate-800">Produto A</li>
                                    <li className="text-slate-800">Produto B</li>
                                    <li className="text-slate-800">Produto C</li>
                                </ul>
                                <ul className="space-y-2">
                                    <li className="text-slate-800 font-semibold">50 unidades</li>
                                    <li className="text-slate-800 font-semibold">30 unidades</li>
                                    <li className="text-slate-800 font-semibold">20 unidades</li>
                                </ul>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg col-span-2  text-align-center text-slate-50  text-start" >
                            <h4 className="text-slate-800 mb-2 font-bold">Actividade Recente</h4>
                            <ul className="text-slate-800 text-start space-y-2 list-disc pl-5 ">
                                <li className="marker:text-green-400">Produto adicionado ao estoque</li>
                                <li className="marker:text-blue-400"> Nova venda</li>
                                <li className="marker:text-yellow-400">Alerta de baixo estoque</li>
                            </ul>
                        </div>



                    </div>
                </section>

            </main>

            </div>
            
        </div>

    )
}
export default dash;