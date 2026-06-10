function Input(props) {
    return (
        <div className="mb-6">
            
            <input
                type={props.type}
                id={props.id}
                name={props.id}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder={props.placeholder}
                onChange={props.function}
                value={props.value}
            />
        </div>
    );
}
export default Input;