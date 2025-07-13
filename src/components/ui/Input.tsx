type InputProps = {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export const Input = ({ label, name, type = "text", value, onChange, placeholder, required = false, disabled = false, className = "" }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`rounded border px-3 py-2 text-sm shadow-sm outline-none transition-all 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${className}`}
      />
    </div>
  );
};
