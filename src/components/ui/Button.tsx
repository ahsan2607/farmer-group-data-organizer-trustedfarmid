type ButtonProps = {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  actionType?: "add" | "edit" | "delete" | "toggle" | "submit" | "custom";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export const Button = ({ label, onClick, type = "button", actionType = "custom", variant, disabled = false, icon, className = "" }: ButtonProps) => {
  const inferredVariant = (() => {
    if (variant) return variant;
    switch (actionType) {
      case "add":
        return "primary";
      case "edit":
        return "secondary";
      case "delete":
        return "danger";
      case "toggle":
      case "submit":
        return "primary";
      default:
        return "ghost";
    }
  })();

  const baseStyles = `${
    icon && label ? "px-3 py-2" : icon ? "p-1.5" : label ? "px-2.5 py-2" : ""
  } rounded-lg font-medium flex flex-row gap-2 items-center shadow hover:shadow-none`;
  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-green-600 text-black hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles[inferredVariant]} ${className}`} data-action-type={actionType}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};
