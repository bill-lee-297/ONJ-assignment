import React from 'react';

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  id?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange, required = false, placeholder = '설명', rows = 1, id, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
      placeholder={placeholder}
      required={required}
      rows={rows}
      id={id}
      {...props}
    />
  );
};

export default DescriptionInput; 