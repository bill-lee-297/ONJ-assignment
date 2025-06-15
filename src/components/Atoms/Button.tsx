import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.FormEvent) => void | Promise<boolean | void>;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, className = '', type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
