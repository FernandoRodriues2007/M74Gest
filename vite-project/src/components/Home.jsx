import perfil from "../assets/img/dashboard.png";
import "../assets/style/Home.css";
import { useState } from "react";
import Login from "./Login.jsx";
import Cadastro from "./Cadastro.jsx"
import useInView from "../Hooks/useInView.js";
import {
    Package,
    BarChart3,
    Smartphone,
    DollarSign,
    ShoppingCart,
    CheckCircle,
    AlertTriangle
} from "lucide-react"

function Section({children,animation}) {
    const [ref,inView] = useInView({threshold:0.1});
    return (
        <section ref={ref} className={`${animation} ${inView ? "" : "opacity-0"}`}>
            {children}
        </section>
    )
    
}

function Home() {
    const [page, setPage] = useState('home');

    if (page === 'login') {
        return <Login  onBack={() => setPage('home')} />;
    }

    if (page === 'cadastro') {
        return <Cadastro  onBack={() => setPage('home')} />;
    }

    const links = [
        { name: "Inicio", href: "#inicio" },
        { name: "Recursos", href: "#recursos" },
        { name: "Sobre", href: "#" },
        { name: "Contato", href: "#" }
    ]
    const card = [
        { id: 1, name: "Controle de Estoque", description: "Melhore seus produtos em tempo real com alerta automático abaixo do estoque", icone: Package },
        { id: 2, name: "Relatórios de Avançados", description: "Análise detalhado das vendas, lucros e perfomance de produtos", icone: BarChart3 },
        { id: 3, name: "Acesso Mobile", description: "Gerencie seus produtos em qualquer lugar de forma responsiva", icone: Smartphone }
    ]
    const listcard = card.map((item, index) =>
        <div key={item.id} style={{ animation: `fadeInUp 0.7s ease-out ${0.2 + index * 0.15}s forwards` }} className="w-90 bg-slate-50 p-8 gap-4 text-start mb-8 rounded-lg opacity-0 hover:shadow-lg transition duration-300 hover:-translate-y-2">
            <div className="p-4 bg-slate-800 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <item.icone className="w-10 h-10 text-white" />

            </div>
            <h1 className="text-xl font-bold text-slate-800">{item.name}</h1>
            <p className="text-slate-600">{item.description}</p>
        </div>
    );
    const linknav = links.map(item =>
        <li key={item.name}><a href={item.href} className="text-slate-800 hover:underline transition duration-300">{item.name}</a></li>
    );





    return (
        <div className="bg-slate-50 " >
            <header className="w-full flex justify-between items-center p-6 sticky top-0 bg-slate-100 shadow-slate-100 z-10">
                <h1 className="text-3xl text-slate-800 font-bold">M74</h1>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        {linknav}

                    </ul>
                </nav>
                <div>
                    <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300" onClick={() => setPage('login')}>Login</button>
                    <button className="ml-2 px-4 py-2 bg-slate-50 text-gray-800 rounded hover:bg-slate-300 transition duration-300" onClick={() => setPage('cadastro')}>Registrar</button>
                </div>
            </header>
            <main className="flex flex-col items-center justify-center ">
                <section animation="animate-fadeInUp" className="text-center p-12 grid justify-items-center align-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 into-view " id="inicio">
                    < div className="bg-opacity-75 p-8 rounded-lg mt-2 md:mt-0 text-start animate-slideInLeft  ">
                        <h2 className="text-5xl font-bold mb-4 text-slate-800 mt-20">Gestão de Produtos Simplificada</h2>
                        <p className=" text-gray-600">O M74 é o sistema de gestão de produtos perfeito para empreendedores que desejam organizar e gerenciar seus negócios de forma eficiente. Com uma interface intuitiva e recursos poderosos, o M74 é a solução ideal para otimizar a gestão de seus produtos e impulsionar o crescimento do seu negócio.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 hover:scale-105">Começar Agora</button>

                    </div>
                    <div className="bg-opacity-75 p-8 rounded-lg animate-slideInRight">
                        <img src={perfil} alt="Perfil do Usuário" className="w-full h-auto" />
                    </div>
                </section>
                <section animation="animate-fadeInUp" className="w-full text-center mt-8 bg-slate-100 p-8 animate-fadeInUp" id="recursos">
                    <h2 className="text-3xl font-semibold mb-2 text-slate-800">Recursos Principais</h2>
                    <p className="text-slate-500 mb-8">Tudo que você precisa para gerenciar seus produtos de forma eficiente e simplificada.</p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 p-4 text-gray-300">

                        {listcard}

                    </div>
                </section>
                <section animation="animate-scaleIn" className="mt-8 p-8 text-center animate-scaleIn into-dashboard" id="dashboard">
                    <h2 className="text-3xl font-semibold mb-2 text-slate-800"> Dashboard </h2>
                    <p className="text-slate-500 mb-8">Acompanhe o desempenho dos seus produtos em tempo real com nosso dashboard intuitivo e fácil de usar.</p>
                    <div className="w-ful rounded shadow-lg bg-slate-100 flex gap-8 ">

                        <div className="w-full p-4 grid grid-cols-2 md:grid-cols-4  gap-4">
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

                    </div>


                </section>
                <section  animation="animate-fadeInUp" className="w-full flex flex-col items-center bg-slate-800 text-slate-50 text-center p-8">
                    <h3 className="text-2xl font-bold text-slate-50 mb-4">Pronto para Revolucionar sua Gestão?</h3>
                    <p className="text-slate-400 max-w-md text-center">Junra-se a milhares de empresa que já confiam na M74.</p>
                    <button className="mt-4 px-6 py-2 bg-slate-50 text-slate-800 rounded-lg hover:bg-slate-600 transition duration-300">Começar Agora</button>

                </section>
            </main>
            <footer className="text-center p-6 bg-slate-900 text-slate-50">

                <div className="grid grid-cols-1  md:grid-cols-3 justify-items-center gap-4 p-4">

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-bold mb-2">M74</h4>
                        <p className="text-slate-400">Soluções de Gestão Empresarial</p>
                    </div>
                    <div className="md:col-span-1">
                        <h4 className="font-bold mb-2">Links Rápidos</h4>
                        <ul className="text-slate-400 space-y-1">
                            <li>Inicio</li>
                            <li>Recursos</li>
                            <li>Suporte</li>
                        </ul>
                    </div>
                    <div className="md:col-span-1">
                        <h4 className="font-bold mb-2">Contato</h4>
                        <ul className="text-slate-400 space-y-1">
                            <li>contato@m74.com</li>
                            <li>(224) 937384029</li>
                        </ul>
                    </div>

                </div>
                <hr className="border border-slate-700 col-span-3 md:col-span-3" />
                <p className="text-slate-400 text-sm col-span-3 md:col-span-1">&copy; 2026 M74. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}
export default Home;