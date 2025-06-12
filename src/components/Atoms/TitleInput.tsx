import React from 'react';

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  id?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange, required = false, placeholder = '제목', id, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full text-xl border-b-2 border-gray-300 px-3 py-2 focus:border-gray-500"
      placeholder={placeholder}
      required={required}
      id={id}
      {...props}
    />
  );
};

export default TitleInput; 