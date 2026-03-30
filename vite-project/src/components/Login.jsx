import "../assets/style/Login.css";
import { UserCircle, ArrowLeft } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import { useState } from "react";
import Cadastro from "./Cadastro";
import Input from "./Input"

function Login({ onBack }) {
    const [page, setPage] = useState('Login');

    if (page === 'Cadastro') {
        return <Cadastro onBack={() => setPage('Login')} />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14">


                <Infodoformulario Title="Bem Vindo de Volta" Nome="Cadastrar" Function={() => setPage('Cadastro')} />


                <div className=" p-8 rounded-lg  w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-6 text-center md:hidden">Bem Vindo de Volta</h2>

                    <form>
                        <div className="mb-6">
                            <UserCircle className="h-14 w-14 text-white mx-auto mb-4" />
                        </div>

                        <Input id="email" type="email" placeholder="Digite seu email" />
                        <Input id="password" type="password" placeholder="Digite sua senha" />

                        <div className="flex justify-center">

                            <Button texto="Login" onClick={() => alert("Login clicado")} />
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
export default Login;