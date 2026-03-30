import "../assets/style/cadastro.css";
import { Linkedin } from "lucide-react";
function Cadastro({ onBack }) {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className=" grid grid-cols-2 text-center bg-slate-800 text-white">
                <div className="max-w-md p-8 rounded-lg shadow-md bg-blue-400 text-white">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
                    <p className="text-center mb-6">To keep connected with us please login with your personal info</p>
                    <button className="w-30 bg-blue-400 border-2  font-bold border-r-white text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 mb-4">Sign In</button>
                </div>
                <div className="max-w-md p-8 rounded-lg shadow-md ">
                    <button type="button" className="text-sm mb-4 underline text-white" onClick={onBack}>Voltar</button>
                    <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
                    <form className="">
                        <div className="mb-4">
                            
                            <Linkedin className="text-2xl" />
                        </div>
                        <div className="mb-4">
                            
                            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder=" Nome:" />
                        </div>
                        <div className="mb-4">
                            
                            <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder=" Email:" />
                        </div>
                        <div className="mb-6">
                            
                            <input type="password" id="password" className="w-full px-3 py-2 border font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="......" />
                        </div>
                        <div className="flex justify-center">

                        <button type="submit" className="w-30 bg-blue-500 text-white py-2 font-bold rounded-full hover:bg-blue-600 transition duration-300">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Cadastro;