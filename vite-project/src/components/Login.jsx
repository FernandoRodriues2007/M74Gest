import "../assets/style/Login.css";
import { UserCircle, ArrowLeft } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import { useState } from "react";
import Cadastro from "./Cadastro";
import Input from "./Input"
import Dash from "./dashboard"; 
import DashAdmin from "../admin/dashboard";

function Login({ onBack }) {
    const [page, setPage] = useState('Login');
    const [text, setText] = useState("");

    if (page === 'Cadastro') {
        return <Cadastro onBack={() => setPage('Login')} />;
    }
    if(page === 'dashboard'){
        return <Dash/>
    }
    if(page === 'admin-dashboard'){
        return <DashAdmin/>
    }

    function check(e){
        setText(e.target.value);
        if(e.target.value === "admin@gmail.com"){
            setPage('admin-dashboard');
        }
    }
    function login(e){
        e.preventDefault();
        alert(text,text);

    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-800 " animation="animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14">


                <Infodoformulario Title="Bem Vindo de Volta" Nome="Cadastrar" Function={() => setPage('Cadastro')} Texto="Para continuar, faça login com suas credenciais." />


                <div className=" p-8 rounded-lg  w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-6 text-center md:hidden">Bem Vindo de Volta</h2>

                    <form onSubmit={login}>
                        <div className="mb-6">
                            <UserCircle className="h-14 w-14 text-white mx-auto mb-4" />
                        </div>

                        <Input id="email" type="email" placeholder="Digite seu email" function={check} />
                        <Input id="password" type="password" placeholder="Digite sua senha"  />

                        <div className="flex justify-center">

                            <Button texto="Login" type="submit" />
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