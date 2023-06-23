import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | Date | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input = ({
  label,
  type,
  name,
  value,
  handleChange,
  placeholder,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-white font-semibold">
        {`${required ? "*": ""}${label}:`}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500"
        value={typeof value === "string" ? value : value?.toISOString().split("T")[0]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
