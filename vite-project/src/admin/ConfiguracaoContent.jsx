import { Save, Settings, Lock, Bell, Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";

function ConfiguracaoContent() {
    const [showPassword, setShowPassword] = useState(false);
    const [configs, setConfigs] = useState({
        empresa: "M74 Gestão",
        email: "admin@m74.ao",
        telefone: "+244 222 000 000",
        moeda: "AOA",
        idioma: "Português",
        notificacoes: true,
        backupAutomatico: true,
        temaEscuro: false,
    });

    const handleChange = (field, value) => {
        setConfigs({
            ...configs,
            [field]: value
        });
    };

    return (
        <section className="p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Settings className="w-8 h-8 text-slate-800" />
                <h2 className="text-3xl font-bold text-slate-800">Configurações</h2>
            </div>

            {/* Configurações da Empresa */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-600" />
                    Informações da Empresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Empresa</label>
                        <input 
                            type="text" 
                            value={configs.empresa}
                            onChange={(e) => handleChange('empresa', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Principal</label>
                        <input 
                            type="email" 
                            value={configs.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone</label>
                        <input 
                            type="tel" 
                            value={configs.telefone}
                            onChange={(e) => handleChange('telefone', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Moeda Padrão</label>
                        <select 
                            value={configs.moeda}
                            onChange={(e) => handleChange('moeda', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>AOA</option>
                            <option>USD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Configurações de Preferências */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-green-600" />
                    Preferências
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Idioma</label>
                        <select 
                            value={configs.idioma}
                            onChange={(e) => handleChange('idioma', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Português</option>
                            <option>Inglês</option>
                            <option>Espanhol</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700">Notificações por Email</label>
                        <button
                            onClick={() => handleChange('notificacoes', !configs.notificacoes)}
                            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                                configs.notificacoes
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            {configs.notificacoes ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            {configs.notificacoes ? 'Ativado' : 'Desativado'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700">Backup Automático</label>
                        <button
                            onClick={() => handleChange('backupAutomatico', !configs.backupAutomatico)}
                            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                                configs.backupAutomatico
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            {configs.backupAutomatico ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            {configs.backupAutomatico ? 'Ativado' : 'Desativado'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border-l-4 border-red-600">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-red-600" />
                    Segurança
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Senha Atual</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nova Senha</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar Nova Senha</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold">
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                </button>
                <button className="flex items-center gap-2 bg-slate-300 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-400 transition duration-300 font-semibold">
                    <X className="w-5 h-5" />
                    Cancelar
                </button>
            </div>
        </section>
    );
}

export default ConfiguracaoContent;
