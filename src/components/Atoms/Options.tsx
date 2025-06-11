import type { TemplateFieldType, TemplateQuestionProps } from '../../data/templates';
import { IoMdClose } from "react-icons/io";
import IcButton from './IcButton';
import OptionsRow from './OptionsRow';

const OptionRadio: React.FC<TemplateQuestionProps & { type: TemplateFieldType }> = ({ idx, fields, setFields, type }) => {
  const field = fields[idx];
  const options = field.options;

  const onAddOption = () => {
    const addIdx = options?.length ? options?.length + 1 : 1;
    const newFields = [...fields];
    newFields[idx].options?.push(`옵션 ${addIdx}`);
    setFields(newFields);
  }

  const onChangeOption = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFields = [...fields];
    
    const optionArr = newFields[idx].options;
    if(optionArr) {
      optionArr[index] = e.target.value;
      newFields[idx].options = optionArr;
    }
    setFields(newFields);
  }

  const onDeleteOption = (index: number) => {
    const newFields = [...fields];
    newFields[idx].options?.splice(index, 1);
    setFields(newFields);
  }

  return (
    <div className="text-md text-gray-500 px-2 py-2 w-full">
      <div className="addOptions flex flex-col gap-4">
        {options?.map((option, index) => (
          <div key={index} className="flex justify-between items-center h-8">
            <OptionsRow>
              {(type === 'radio' || type === 'checkbox') && <input type={type} className="w-4 h-4" checked={false} />}
              {type === 'dropdown' && <div>{index+1}</div>}
              <input type="text" className="text-sm h-8 hover:outline-1 hover:outline-gray-300 rounded" value={option} onChange={e => onChangeOption(e, index)} />
            </OptionsRow>
            <IcButton onClick={() => onDeleteOption(index)}>
              <IoMdClose size={24} className="text-gray-500 hover:text-gray-900 transition" />
            </IcButton>
          </div>
        ))}
      </div>
      <OptionsRow className="mt-4">
        {(type === 'radio' || type === 'checkbox') && <input type={type} className="w-4 h-4" checked={false} />}
        {type === 'dropdown' && <div>{options?.length ? options?.length + 1 : 1}</div>}

        <input type="text" className="text-sm h-8" placeholder="옵션 추가" onClick={onAddOption} />
      </OptionsRow>
    </div>
  );
};

export default OptionRadio;