import { useState } from 'react';
import OptionsRow from '../Atoms/OptionsRow';
import CheckInput from '../Atoms/CheckInput';

interface DetailFieldOptionsProps {
  type: string;
  options: string[];
}

const DetailFieldOptions = ({ type, options }: DetailFieldOptionsProps) => {
  const [text, setText] = useState<string>('');
  const [selectedRadio, setSelectedRadio] = useState<number>();
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');

  const handleCheckChange = (index: number) => {
    if (type === 'radio') {
      setSelectedRadio(index);
    } else if (type === 'checkbox') {
      if (selectedCheckbox.includes(index)) {
        setSelectedCheckbox(selectedCheckbox.filter(i => i !== index));
      } else {
        setSelectedCheckbox([...selectedCheckbox, index]);
      }
    }
  };

  return (
    <div>
      {(type === 'radio' || type === 'checkbox') &&
        options.map((option, index) => (
          <OptionsRow key={option} onClick={() => handleCheckChange(index)}>
            <CheckInput
              type={type}
              key={option}
              value={index}
              checked={type === 'radio' ? selectedRadio === index : selectedCheckbox.includes(index)}
            />
            <label>{option}</label>
          </OptionsRow>
        ))}
      {type === 'dropdown' && (
        <select
          className="w-full text-md h-8 border border-gray-300 rounded cursor-pointer"
          onChange={e => setSelectedDropdown(e.target.value)}
          value={selectedDropdown}
        >
          <option value="">선택</option>
          {options.map((option, index) => (
            <option value={index}>{option}</option>
          ))}
        </select>
      )}
      {type === 'text' && (
        <input
          type="text"
          className="w-full text-md h-8 border border-gray-300 rounded"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}
    </div>
  );
};

export default DetailFieldOptions;
