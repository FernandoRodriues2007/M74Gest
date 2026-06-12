function Button(props) {
    return(
        <button className="w-30 bg-slate-100  font-bold  text-slate-800 py-2 rounded-full hover:bg-slate-800 hover:text-white md:w-full md:rounded-md transition duration-300 mb-4" onClick={props.onClick}  type={props.type}>
            {props. texto}
        </button>
    )
}
export default Button;