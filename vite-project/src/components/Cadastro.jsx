import "../assets/style/cadastro.css";
import { ArrowLeft, User, Mail, Lock, AlertCircle } from "lucide-react";
import Button from "./Button";
import Login from "./Login";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { validations, getErrorMessage } from "../utils/validations";

function Select({ value, onChange }) {
    return (
        <div className="mb-6">
            <select
                id="role"
                name="role"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-slate-700 text-white"
                value={value}
                onChange={onChange}
            >
                <option value="">Selecione o tipo de conta</option>
                <option value="client">Cliente</option>
                <option value="user">Funcionário</option>
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

        // Backend sempre cria com role 'user' independente do que é enviado
        const submitData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
        };

        const result = await register(submitData);
        if (result.success) {
            if (onBack) {
                // Veio como modal/componente embutido, volta para Login
                setPage('Login');
            } else {
                // Registo bem sucedido — redireciona para o dashboard
                const nextPath = result.user?.role === 'admin' ? '/admin' : '/dashboard';
                navigate(nextPath);
            }
        } else {
            setServerError(result.message || 'Erro ao registrar');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
            <div className="grid grid-cols-1  place-content-center place-items-center text-center   md:p-14 gap-6 w-full max-w-7xl rounded-3xl ">
               

                <div className="w-full max-w-md p-8 rounded-lg bg-white">
                    <div className="mb-6 p-4 flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold text-slate-800">M74</h1>
                        <p className="text-slate-500 mb-8">Sistema de gestão inteligente</p>
                        <h2 className="text-2xl  text-slate-800">Crie sua conta</h2>
                        <p className="text-slate-500 ">Preencha os campos  para criar a sua conta</p>
                    </div>

                    {serverError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 text-left mb-4 text-red-700 bg-opacity-20">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm">{serverError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 text-left bg-white">

                        <Input
                            Icon={User}
                            id="name"
                            name="name"
                            type="text"
                            placeholder=" Nome:"
                            value={formData.name}
                            function={handleChange}
                        />
                        {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}


                        <Input
                            Icon={Mail}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email:"
                            value={formData.email}
                            function={handleChange}
                        />
                        {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}


                        <Input
                            Icon={Lock}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha:"
                            value={formData.password}
                            function={handleChange}
                        />
                        {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}


                        <Select
                            value={formData.role}
                            onChange={handleChange}
                        />
                        {errors.role && <p className="text-sm text-red-400">{errors.role}</p>}

                        <div className="flex justify-center">
                            <Button texto={isLoading ? 'Registrando...' : 'Registrar'} type="submit" />
                        </div>
                        
                        <hr className="bg-slate-800 w-full mb-5" />

                        <div className=" w-full flex  space-x-2 items-center text-center justify-center">
                            <p className="text-slate-800">Já tens uma conta?</p>

                            <button
                                type="button"
                                className=" text-slate-800 hover:text-slate-900  transition"
                                onClick={ () => setPage('Login')}
                            >
                                
                                Fazer Login
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Cadastro;