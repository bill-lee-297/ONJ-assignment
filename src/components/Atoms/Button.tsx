import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 