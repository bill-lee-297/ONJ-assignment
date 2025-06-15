import type { TemplateQuestionType, TemplateQuestion } from '@/type/templates';
import { IoMdClose } from 'react-icons/io';
import OptionsRow from '@/components/Atoms/OptionsRow';
import CheckInput from '@/components/Atoms/CheckInput';
import { useCreateStore } from '@/store/createStore';
import { memo } from 'react';
import OptionInput from '@/components/Atoms/OptionInput';

interface OptionProps {
  question: TemplateQuestion;
  type: TemplateQuestionType;
}

const Option = memo(({ question, type }: OptionProps) => {
  const setQuestion = useCreateStore(state => state.setQuestion);

  const onAddOption = () =>{
    if (!question) return;
    const options = question.options;
    const addIdx = options?.length ? options.length + 1 : 1;
    const newOptions = options ? [...options, `옵션 ${addIdx}`] : [`옵션 ${addIdx}`];

    const newQuestion = { ...question, options: newOptions };
    setQuestion(newQuestion);
  };

  const onDeleteOption = (index: number) => {
    if (!question) return;
    const options = question.options;
    const newOptions = options ? options.filter((_, i) => i !== index) : [];

    const newQuestion = { ...question, options: newOptions };
    setQuestion(newQuestion);
  };

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!question) return;
    const newOptions = [...(question.options || [])];
    newOptions[index] = e.target.value;
    setQuestion({ ...question, options: newOptions });
  };

  if (!question) {
    return null;
  }

  const options = question.options;

  return (
    <div className="text-md text-gray-500 px-2 py-2 w-full">
      <div className="addOptions flex flex-col gap-4">
        {options?.map((option, index) => (
          <div key={`${question.id}-option-${index}`} className="flex justify-between items-center h-8">
            <OptionsRow>
              {(type === 'radio' || type === 'checkbox') && <CheckInput type={type} checked={false} />}
              {type === 'dropdown' && <div>{index + 1}</div>}
              <OptionInput 
                key={`${question.id}-option-${index}`} 
                className="hover:outline-1 hover:outline-gray-300 rounded" 
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
        
        <OptionInput
          className="cursor-pointer"
          placeholder="옵션 추가"
          onClick={onAddOption}
          readOnly
        />
      </OptionsRow>
    </div>
  );
});

export default Option;
