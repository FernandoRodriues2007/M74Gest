function Infodoformulario(props) {
    return (
        <div className="max-w-md p-8 rounded-lg shadow-md bg-blue-400 text-white  flex-col items-center justify-center hidden md:flex">
            <h2 className="text-2xl font-bold mb-6 text-center">{props.Title}</h2>
            <p className="text-center mb-6">To keep connected with us please login with your personal info</p>
            <button className="w-30 bg-slate-800   font-bold border-r-white text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 mb-4" onClick={props.Function} >{props.Nome}</button>
        </div>
    )
}
export default Infodoformulario;