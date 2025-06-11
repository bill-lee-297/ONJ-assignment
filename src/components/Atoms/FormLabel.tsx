import React from 'react';

interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ children, className = '' }) => {
  return (
    <label className={`block mb-1 font-medium ${className}`}>
      {children}
    </label>
  );
};

export default FormLabel; 