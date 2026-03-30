function Input({ id, type, placeholder }) {
    return (
        <div className="mb-6">
            
            <input
                type={type}
                id={id}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder={placeholder}
            />
        </div>
    );
}
export default Input;