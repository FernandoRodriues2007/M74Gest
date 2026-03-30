import "../assets/style/Login.css";
import { UserCheck ,ArrowLeft} from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";

function Login({ onBack }) {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className="grid grid-cols-2 text-center bg-slate-800 text-white">


                <Infodoformulario />


                <div className=" p-8 rounded-lg  w-full max-w-md ">

                    <form>
                        <div className="mb-6">
                            <UserCheck className="h-14 w-14 text-white mx-auto mb-4" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white md:text-slate-800 mb-2" htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Digite seu email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white md:text-slate-800 mb-2" htmlFor="password">Senha</label>
                            <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Digite sua senha" />
                        </div>
                        <div className="flex justify-center">

                            <Button texto="Login" onClick={() => alert("Login clicado")} />
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