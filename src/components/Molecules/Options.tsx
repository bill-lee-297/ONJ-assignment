import type { TemplateFieldType, TemplateField } from '../../type/templates';
import { IoMdClose } from 'react-icons/io';
import OptionsRow from '../Atoms/OptionsRow';
import CheckInput from '../Atoms/CheckInput';
import { useCreateStore } from '@/store/createStore';
import { memo } from 'react';
import OptionInput from '../Atoms/OptionInput';

interface OptionProps {
  field: TemplateField;
  type: TemplateFieldType;
}

const Option = memo(({ field, type }: OptionProps) => {
  const setField = useCreateStore(state => state.setField);

  const onAddOption = () =>{
    if (!field) return;
    const options = field.options;
    const addIdx = options?.length ? options.length + 1 : 1;
    const newOptions = options ? [...options, `옵션 ${addIdx}`] : [`옵션 ${addIdx}`];

    const newField = { ...field, options: newOptions };
    setField(newField);
  };

  const onDeleteOption = (index: number) => {
    if (!field) return;
    const options = field.options;
    const newOptions = options ? options.filter((_, i) => i !== index) : [];

    const newField = { ...field, options: newOptions };
    setField(newField);
  };

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!field) return;
    const newOptions = [...(field.options || [])];
    newOptions[index] = e.target.value;
    setField({ ...field, options: newOptions });
  };

  if (!field) {
    return null;
  }

  const options = field.options;

  return (
    <div className="text-md text-gray-500 px-2 py-2 w-full">
      <div className="addOptions flex flex-col gap-4">
        {options?.map((option, index) => (
          <div key={`${field.id}-option-${index}`} className="flex justify-between items-center h-8">
            <OptionsRow>
              {(type === 'radio' || type === 'checkbox') && <CheckInput type={type} checked={false} />}
              {type === 'dropdown' && <div>{index + 1}</div>}
              <input
                key={`${field.id}-option-${index}-input`}
                type="text"
                className="text-sm h-8 hover:outline-1 hover:outline-gray-300 rounded"
                value={option}
                onChange={e => onOptionChange(e, index)}
              />
            </OptionsRow>
            <button type="button" onClick={() => onDeleteOption(index)} className="cursor-pointer">
              <IoMdClose size={24} className="text-gray-500 hover:text-gray-900 transition" />
            </button>
          </div>
        ))}
      </div>
      <OptionsRow className="mt-4">
        {(type === 'radio' || type === 'checkbox') && <CheckInput type={type} checked={false} />}
        {type === 'dropdown' && <div>{options?.length ? options?.length + 1 : 1}</div>}

        <input
          type="text"
          className="text-sm h-8 cursor-pointer"
          placeholder="옵션 추가"
          onClick={onAddOption}
          readOnly
        />
      </OptionsRow>
    </div>
  );
});

export default Option;
