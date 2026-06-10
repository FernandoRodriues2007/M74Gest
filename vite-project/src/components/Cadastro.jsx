import "../assets/style/cadastro.css";
import { ArrowLeft, UserPlus, AlertCircle } from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
import Login from "./Login";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { validations, getErrorMessage } from "../utils/validations";

function Select({ value, onChange }) {
    return(
        <div className="mb-6">
            <select
                id="role"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChange}
                value={value}
            >
                <option value="">Selecione uma opção</option>
                <option value="user">Utilizador Padrão</option>
                <option value="admin">Administrador</option>
            </select>
        </div>
    );
}

function Cadastro({ onBack }) {
    const [page, setPage] = useState('Cadastro');
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    if (page === 'Login') {
        return <Login onBack={() => setPage('Cadastro')} />;
    }

    const validateForm = () => {
        const newErrors = {};

        if (validations.isEmpty(formData.name)) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (validations.isEmpty(formData.email)) {
            newErrors.email = getErrorMessage('email', 'required');
        } else if (!validations.email(formData.email)) {
            newErrors.email = getErrorMessage('email', 'invalid');
        }

        if (validations.isEmpty(formData.password)) {
            newErrors.password = getErrorMessage('password', 'required');
        } else if (!validations.password(formData.password)) {
            newErrors.password = getErrorMessage('password', 'invalid');
        }

        if (validations.isEmpty(formData.role)) {
            newErrors.role = 'Selecione o tipo de usuário';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Ensure role is always set to 'user' if not admin
        const submitData = {
            ...formData,
            role: formData.role === 'admin' ? 'admin' : 'user'
        };

        const result = await register(submitData);
        if (result.success) {
            if (onBack) {
                setPage('Login');
            } else {
                navigate('/login');
            }
        } else {
            setServerError(result.message || 'Erro ao registrar');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 text-center bg-slate-800 text-white md:p-14 gap-6 w-full max-w-6xl rounded-3xl ">
                <Infodoformulario
                    Title="Seja Bem Vindo a M74"
                    Nome="Login"
                    Function={() => setPage('Login')}
                    Texto="Já tem uma conta? Faça login agora dando um click no botão á baixo"
                />

                <div className="w-full max-w-md p-8 rounded-lg">
                    <div className="mb-6 p-4 flex flex-col items-center justify-center">
                        <UserPlus className="h-14 w-14 text-white mb-4" />
                        <h2 className="text-2xl font-bold text-white">Crie sua conta</h2>
                    </div>

                    {serverError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 text-left mb-4 text-red-700 bg-opacity-20">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm">{serverError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder=" Nome:"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}

                        
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email:"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}

                
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha:"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}

                        
                        <Select 
                            value={formData.role} 
                            onChange={(e) => {
                                handleChange({ target: { name: 'role', value: e.target.value } });
                            }} 
                        />
                        {errors.role && <p className="text-sm text-red-400">{errors.role}</p>}

                        <div className="flex justify-center">
                            <Button texto={isLoading ? 'Registrando...' : 'Registrar'} type="submit" />
                        </div>
                    </form>

                    <button
                        type="button"
                        className="w-full py-2 rounded-full text-sm mt-4 text-white border border-slate-700 hover:bg-slate-700 transition"
                        onClick={onBack ? onBack : () => navigate('/')}
                    >
                        <ArrowLeft className="h-4 w-4 inline mr-2" />
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Cadastro;