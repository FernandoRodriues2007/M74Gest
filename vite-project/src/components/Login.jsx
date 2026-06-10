import "../assets/style/Login.css";
import { UserCircle, ArrowLeft, AlertCircle } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import { useState } from "react";
import Cadastro from "./Cadastro";
import Input from "./Input"
import Dash from "./dashboard"; 
import DashAdmin from "../admin/dashboard";
import { useAuth } from "../contexts/useAuth";

function Login({ onBack }) {
    const [page, setPage] = useState('Login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login: authLogin, isLoading, isAuthenticated, user } = useAuth();

    if (page === 'Cadastro') {
        return <Cadastro onBack={() => setPage('Login')} />;
    }
    if(page === 'dashboard'){
        return <Dash/>
    }
    if(page === 'admin-dashboard'){
        return <DashAdmin/>
    }

    if (isAuthenticated && user) {
        if (user.role === 'admin') {
            return <DashAdmin/>;
        }
        return <Dash/>;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!email || !password) {
            setError("Email e senha são obrigatórios");
            return;
        }

        const result = await authLogin(email, password);
        if (result.success) {
            if (result.user.role === 'admin') {
                setPage('admin-dashboard');
            } else {
                setPage('dashboard');
            }
        } else {
            setError(result.message || 'Erro ao fazer login');
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-800 " animation="animate-fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14">


                <Infodoformulario Title="Bem Vindo de Volta" Nome="Cadastrar" Function={() => setPage('Cadastro')} Texto="Para continuar, faça login com suas credenciais." />


                <div className=" p-8 rounded-lg  w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-6 text-center md:hidden">Bem Vindo de Volta</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 text-left mb-4 text-red-700 bg-opacity-20 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <UserCircle className="h-14 w-14 text-white mx-auto mb-4" />
                        </div>

                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="Digite seu email" 
                            function={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Digite sua senha" 
                            function={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <div className="flex justify-center">
                            <Button texto={isLoading ? 'Autenticando...' : 'Login'} type="submit" />
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