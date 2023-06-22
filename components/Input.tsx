import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
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
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full bg-transparent p-3 border rounded-lg border-white text-white"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};