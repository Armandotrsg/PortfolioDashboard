export const Input = ({ label, type, name, value, handleChange, placeholder, required }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-white">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                className="w-full bg-transparent rounded-lg p-3 border-b-2 border-white text-white"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
} 