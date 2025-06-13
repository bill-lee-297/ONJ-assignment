import { useState } from "react";
import OptionsRow from "../Atoms/OptionsRow";

interface DetailFieldOptionsProps {
  type: string;
  options: string[]
}

const DetailFieldOptions = ({ type, options }: DetailFieldOptionsProps) => {
  const [selectedRadio, setSelectedRadio] = useState<number>();
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');

  const handleRadioChange = (index: number) => {
    setSelectedRadio(index);
  }

  const handleCheckboxChange = (index: number) => {
    if (selectedCheckbox.includes(index)) {
      setSelectedCheckbox(selectedCheckbox.filter((i) => i !== index));
    } else {
      setSelectedCheckbox([...selectedCheckbox, index]);
    }
  }

  return (
    <div>
      {type === 'radio' && options.map((option, index) => (
        <OptionsRow key={option} onClick={() => handleRadioChange(index)}>
          <input type={type} key={option} value={index} checked={selectedRadio === index} />
          <label>{option}</label>
        </OptionsRow>
      ))}
      {type === 'checkbox' && options.map((option, index) => (
        <OptionsRow key={option} onClick={() => handleCheckboxChange(index)}>
          <input type={type} key={option} value={index} checked={selectedCheckbox.includes(index)} />
          <label>{option}</label>
        </OptionsRow>
      ))}
      {type === 'dropdown' && (
        <select className="w-full text-md h-8 border border-gray-300 rounded cursor-pointer" onChange={(e) => setSelectedDropdown(e.target.value)} value={selectedDropdown}>
          <option value="">선택</option>
          {options.map((option, index) => (
            <option value={index}>{option}</option>
          ))}
        </select>
      )}
      {type === 'text' && <input type="text" className="w-full text-md h-8 border border-gray-300 rounded" />}
    </div>
  );
};

export default DetailFieldOptions;