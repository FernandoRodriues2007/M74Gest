import { Eye, EyeOff, AlertCircle, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { login: authLogin, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email e senha são obrigatórios");
            return;
        }

        const result = await authLogin(email, password);
        if (result.success) {
            const role = result.user.role;
            const dest = role === 'admin' ? '/admin' : role === 'client' ? '/cliente' : '/dashboard';
            navigate(dest, { replace: true });
        } else {
            setError(result.message || 'Erro ao fazer login');
        }
    };

    const irParaCadastro = () => navigate('/cadastro');

    return (
        <div className="min-h-screen bg-slate-300 flex items-center justify-center p-4">

            {/* Decoração de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-700/40 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-2xl">

                {/* ── Painel esquerdo ── */}
                <div className="hidden md:flex flex-col justify-between bg-slate-800 p-10 text-white">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-1">M74</h1>
                        <p className="text-blue-200 text-sm">Gestão Inteligente</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4 leading-snug">
                            Bem-vindo<br />de volta 
                        </h2>
                        <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                            Aceda ao seu painel e gira os seus produtos, clientes e vendas de forma simples.
                        </p>
                        <div className="border-t border-white pt-6">
                            <p className="text-blue-200 text-sm mb-3">Ainda não tem conta?</p>
                            <button
                                onClick={irParaCadastro}
                                className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-200"
                            >
                                Criar conta gratuita
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Painel direito — formulário ── */}
                <div className="bg-white flex flex-col justify-center p-8 md:p-10">

                    <div className="md:hidden text-center mb-8">
                        <h1 className="text-3xl font-black text-slate-800">M74</h1>
                        <p className="text-slate-500 text-sm">Gestão Inteligente</p>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-1">Entrar</h3>
                    <p className="text-slate-500 text-sm mb-7">Introduza as suas credenciais para continuar</p>

                    {error && (
                        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-5 text-sm">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border-2 border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-800 text-white py-3 rounded-md font-semibold text-sm hover:bg-slate-900 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    A autenticar...
                                </>
                            ) : (
                                <>Entrar <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <p className="md:hidden text-center text-sm text-slate-500 mt-6">
                        Sem conta?{' '}
                        <button onClick={irParaCadastro} className="text-blue-600 font-semibold hover:underline">
                            Registar agora
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
