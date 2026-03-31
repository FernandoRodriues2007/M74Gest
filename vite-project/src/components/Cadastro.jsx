import "../assets/style/cadastro.css";
import { UserCircle, ArrowLeft } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import Login from "./Login";
import Input from "./Input"
import { useState } from "react";

function Cadastro({ onBack }) {
    const [page, setPage] = useState('Cadastro');
    if (page === 'Login') {
        return <Login onBack={() => setPage('Cadastro')} />;
    }
    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className=" grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14 ">

                <Infodoformulario Title="Seja Bem Vindo a M74" Nome="Login" Function={() => setPage('Login')} Texto="Já tem uma conta? Faça login agora." />


                <div className="max-w-md p-8 rounded-lg shadow-md ">

                    <form className="space-y-8">
                        <div className="mb-6 p-4 flex justify-center">
                            <UserCircle className="   h-14 w-14" />

                        </div>

                        <Input id="name" type="text" placeholder="Digite seu nome" />
                        <Input id="email" type="email" placeholder="Digite seu email" />
                        <Input id="password" type="password" placeholder="Digite sua senha" />

                        <div className="flex justify-center">

                            <Button texto="Registrar" onClick={() => alert("Registrar clicado")} />
                        </div>
                    </form>
                    <button type="button" className="w-24 py-2 rounded-full text-sm mb-4  text-white  hover:bg-slate-700" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4 inline mr-2" />
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Cadastro;