import { ArrowLeft, ArrowRight, UserPlus, AlertCircle, Mail, Lock, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { validations, getErrorMessage } from "../utils/validations";

function Cadastro({ onBack }) {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validateForm = () => {
        const e = {};
        if (validations.isEmpty(formData.name))      e.name     = 'Nome é obrigatório';
        if (validations.isEmpty(formData.email))     e.email    = getErrorMessage('email', 'required');
        else if (!validations.email(formData.email)) e.email    = getErrorMessage('email', 'invalid');
        if (validations.isEmpty(formData.password))  e.password = getErrorMessage('password', 'required');
        else if (!validations.password(formData.password)) e.password = getErrorMessage('password', 'invalid');
        if (validations.isEmpty(formData.role))      e.role     = 'Selecione o tipo de conta';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await register(formData);
        if (result.success) {
            const role = result.user?.role;
            navigate(role === 'admin' ? '/admin' : role === 'client' ? '/cliente' : '/dashboard', { replace: true });
        } else {
            setServerError(result.message || 'Erro ao registrar');
        }
    };

    const irParaLogin = () => navigate('/login');

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">

            {/* Decoração de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-slate-700/40 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">

                {/* ── Painel esquerdo ── */}
                <div className="hidden md:flex flex-col justify-between bg-slate-800 p-10 text-white">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-1">M74</h1>
                        <p className="text-slate-400 text-sm">Gestão Inteligente</p>
                    </div>
                    <div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                            <UserPlus className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 leading-snug">
                            Crie a sua<br />conta agora 
                        </h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Registe-se e comece a gerir produtos, clientes e vendas no mesmo lugar.
                        </p>
                        <div className="border-t border-slate-700 pt-6">
                            <p className="text-slate-400 text-sm mb-3">Já tem conta?</p>
                            <button
                                onClick={irParaLogin}
                                className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-200"
                            >
                                Fazer login
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Painel direito — formulário ── */}
                <div className="bg-white flex flex-col justify-center p-8 md:p-10">

                    <div className="md:hidden text-center mb-6">
                        <h1 className="text-3xl font-black text-slate-800">M74</h1>
                        <p className="text-slate-500 text-sm">Gestão Inteligente</p>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-1">Criar conta</h3>
                    <p className="text-slate-500 text-sm mb-6">Preencha os dados abaixo para começar</p>

                    {serverError && (
                        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-5 text-sm">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{serverError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Nome */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Nome completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text" name="name" value={formData.name}
                                    onChange={handleChange} placeholder="O seu nome"
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email" name="email" value={formData.email}
                                    onChange={handleChange} placeholder="seu@email.com"
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password" name="password" value={formData.password}
                                    onChange={handleChange} placeholder="Mínimo 6 caracteres"
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                                />
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
                        </div>

                        {/* Tipo de conta */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Tipo de conta</label>
                            <div className="relative">
                                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <select
                                    name="role" value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm text-slate-800 focus:outline-none transition appearance-none bg-white ${errors.role ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                                >
                                    <option value="">Selecione o tipo de conta</option>
                                    <option value="client">Cliente</option>
                                    <option value="user">Funcionário</option>
                                </select>
                            </div>
                            {errors.role && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.role}</p>}
                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    A registar...
                                </>
                            ) : (
                                <>Criar conta <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    {/* Rodapé */}
                    <div className="flex items-center justify-between mt-5">
                        <button
                            type="button"
                            onClick={onBack ? onBack : () => navigate('/')}
                            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition"
                        >
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </button>
                        <p className="md:hidden text-sm text-slate-500">
                            Tem conta?{' '}
                            <button onClick={irParaLogin} className="text-blue-600 font-semibold hover:underline">
                                Entrar
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
