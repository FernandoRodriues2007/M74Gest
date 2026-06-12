function Infodoformulario(props) {
    return (
        <div className="max-w-md p-8 rounded-lg shadow-md bg-blue-500 text-white  flex-col items-center justify-center hidden md:flex">
            <h1 className="text-3xl font-bold mb-4 text-center ">{props.Title1}</h1>
            <p className="text-slate-400 mb-8">{props.Paragrafo}</p>
            <h2 className="text-2xl font-bold mb-6 text-center">{props.Title}</h2>
            <p className="text-center mb-6">{props.Texto}</p>
            <hr className="bg-slate-400 w-full mb-3" />
            <div className="w-full  flex flex-wrap space-x-1 items-center text-center justify-center">
                <p className="text-1xl">Ainda não tem Conta?</p>
                <button className="w-30    text-white py-2 " onClick={props.Function} >{props.Nome}</button>
            </div>

        </div>
    )
}
export default Infodoformulario;