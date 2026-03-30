import "../assets/style/cadastro.css";
import { UserCircle,ArrowLeft} from "lucide-react";
import Infodoformulario from "./Infodoformulario";
import Button from "./Button";
function Cadastro({ onBack }) {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-800">
            <div className=" grid grid-cols-2 text-center bg-slate-800 text-white">
                <Infodoformulario />

               
                <div className="max-w-md p-8 rounded-lg shadow-md ">
                    
                    <form className="space-y-8">
                        <div className="mb-6 p-4 flex justify-center">
                        <UserCircle className="   h-14 w-14"/>

                        </div>
                        
                        <div className="mb-6">
                            
                            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder=" Nome:" />
                        </div>
                        <div className="mb-6">
                            
                            <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder=" Email:" />
                        </div>
                        <div className="mb-8">
                            
                            <input type="password" id="password" className="w-full px-3 py-2 border font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="......" />
                        </div>
                        <div className="flex justify-center">

                            <Button texto="Registrar" onClick={() => alert("Registrar clicado")} />
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
export default Cadastro;