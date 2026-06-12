function Input(props) {
    return (
        <div className="  mb-4 w-full px-3 py-2 border border-slate-500 text-slate-500 rounded-lg flex items-center space-x-2" >
            <div className="">{props.Icon && <props.Icon className="w-5 h-5  "/> }</div>
            <input
                type={props.type}
                id={props.id}
                name={props.name || props.id}
                className="w-full outline-none focus:outline-none   text-slate-500"
                placeholder={props.placeholder}
                onChange={props.function}
                value={props.value}
            />
        </div>
    );
}
export default Input;
