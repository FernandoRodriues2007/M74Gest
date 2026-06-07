import "../assets/style/cadastro.css";
import { UserCircle, ArrowLeft,UserPlus } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import Login from "./Login";
import Input from "./Input";
import Links from "./links";
import { useState } from "react";

function Select(props){
    return(
        <div className="mb-6">
            <select id={props.id} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" onChange={props.function} value={props.value}>
                <option value="">Selecione uma opção</option>
                <option value="Cliente">Cliente</option>
                <option value="funcionario">Funcionário</option>
            </select>
        </div>
    );
    
}
function Cadastro({ onBack }) {
    const [page, setPage] = useState('Cadastro');
    if (page === 'Login') {
        return <Login onBack={() => setPage('Cadastro')} />;
    }
    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className=" grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14 ">

                <Infodoformulario Title="Seja Bem Vindo a M74" Nome="Login" Function={() => setPage('Login')} Texto="Já tem uma conta? Faça login agora dando um click no botão á baixo" />


                <div className="w-full max-w-md p-8 rounded-lg  ">

                    <form className="">
                        <div className="mb-6 p-4 flex justify-center">
                            <UserPlus className="   h-14 w-14" />
                            <Links Href="#" Tetx="Test"  />

                        </div>

                        <Input id="name" type="text" placeholder="Digite seu nome" />
                        <Select id="role" />
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