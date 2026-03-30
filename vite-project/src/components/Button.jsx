function Button(props) {
    return(
        <button className="w-30 bg-blue-500  font-bold  text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 mb-4" onClick={props.onClick}>
            {props. texto}
        </button>
    )
}
export default Button;