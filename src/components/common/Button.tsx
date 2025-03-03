import React, { ReactNode } from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  className = '',
  children,
  icon,
  fullWidth = false,
}) => {
  const baseStyles = "flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-300"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = (disabled || isLoading) ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 mr-2 animate-spin" />
          {typeof children === 'string' ? 'Cargando...' : children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
