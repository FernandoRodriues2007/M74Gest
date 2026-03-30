import "../assets/style/Login.css";

function Login({ onBack }){
    return(
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className="md:bg-white p-8 rounded-lg md:shadow-md w-full max-w-md ">
                <button type="button" className="text-sm mb-4 underline text-white md:text-slate-800" onClick={onBack}>Voltar</button>
                <h2 className="text-2xl font-bold mb-6 text-center text-white md:text-slate-800">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-white md:text-slate-800 mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Digite seu email" />
                    </div>
                    <div className="mb-6">
                            <label className="block text-white md:text-slate-800 mb-2" htmlFor="password">Senha</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Digite sua senha" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Entrar</button>
                </form>
            </div>
        </div>
    )
}
export default Login;