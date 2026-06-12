import "../assets/style/Login.css";
import { Mail, Lock, AlertCircle, Send, KeyIcon } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import Cadastro from "./Cadastro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Login({ onBack }) {
    const [page, setPage] = useState('Login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login: authLogin, isLoading } = useAuth();
    const navigate = useNavigate();

    // Quando usado como componente embutido (com onBack), mostra Cadastro
    if (page === 'Cadastro') {
        return <Cadastro onBack={() => setPage('Login')} />;
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
            const dest = result.user.role === 'admin' ? '/admin' : '/dashboard';
            navigate(dest, { replace: true });
        } else {
            setError(result.message || 'Erro ao fazer login');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className="grid grid-cols-1  text-center bg-slate-800  md:p-14 w-full max-w-5xl">



                <div className="p-8 rounded-lg w-full max-w-md mx-auto">

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 text-left mb-4 text-red-700 bg-opacity-20">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="bg-white  backdrop-blur-3xl rounded-lg p-6">

                        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">M74</h1>
                        <h2 className="text-2xl text-center mb-4 text-slate-800 font-bold">Bem Vindo de Volta</h2>
                        <p className="text-slate-500 mb-7">Use as suas credenciais para aceder a M74</p>


                        <Input
                            Icon={Mail}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email:"
                            function={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Input
                            Icon={Lock}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha:"
                            function={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <div className="flex justify-center">
                            <Button texto={isLoading ? 'Autenticando...' : 'Login'} type="submit" />
                        </div>
                        <hr className="bg-slate-800 w-full mb-5" />

                        <div className=" w-full flex  space-x-2 items-center text-center justify-center">
                            <p className="">Ainda não tens conta?</p>

                            <button
                                type="button"
                                className=" text-slate-800 hover:text-slate-900  transition"
                                onClick={() => setPage('Cadastro')}
                            >
                                
                                Criar Conta
                            </button>
                        </div>


                    </form>

                </div>

            </div>
        </div>
    );
}

export default Login;
