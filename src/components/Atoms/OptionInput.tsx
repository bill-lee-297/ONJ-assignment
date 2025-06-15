import { memo } from 'react';
import { useCreateStore } from '@/store/createStore';
import type { TemplateField } from '@/type/templates';

interface OptionInputProps {
  field: TemplateField;
  index: number;
  value: string;
}

const OptionInput = memo(({ field, index, value }: OptionInputProps) => {
  const setField = useCreateStore(state => state.setField);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = e.target.value;
    setField({ ...field, options: newOptions });
  };

  return (
    <input
      type="text"
      className="text-sm h-8 hover:outline-1 hover:outline-gray-300 rounded"
      value={value}
      onChange={onChange}
    />
  );
});

OptionInput.displayName = 'OptionInput';

export default OptionInput; 