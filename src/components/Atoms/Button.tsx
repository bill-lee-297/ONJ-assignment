import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.FormEvent) => void | Promise<boolean | void>;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, className = '', type = 'button', variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-6 py-1.5 rounded border transition-colors cursor-pointer ${className} ${variant === 'primary' ? 'border-blue-500 bg-blue-600 text-white hover:bg-blue-800' : 'border-gray-100 bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
