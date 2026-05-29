function Button(props) {
    return(
        <button className="w-30 bg-slate-100  font-bold  text-slate-800 py-2 rounded-full hover:bg-slate-700 transition duration-300 mb-4" onClick={props.onClick}>
            {props. texto}
        </button>
    )
}
export default Button;