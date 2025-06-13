import { MdDeleteOutline } from "react-icons/md";
import type { TemplateQuestionProps } from '../../type/templates';
import IcButton from '../Atoms/IcButton';


const FieldToolbar = ({ idx, fields, setFields }: TemplateQuestionProps) => {
  const field = fields[idx];

  const onToggleRequired = () => {
    const newFields = [...fields];
    newFields[idx] = { ...newFields[idx], required: !newFields[idx].required };
    setFields(newFields);
  }

  const onDelete = () => {
    const newFields = [...fields];
    newFields.splice(idx, 1);
    setFields(newFields);
  }


  return (
    <div className="flex justify-end items-center border-t border-gray-300 pt-2 mt-4">
      <IcButton
        onClick={onDelete}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MdDeleteOutline size={24} className="text-gray-500 hover:text-gray-900 transition" />
      </IcButton>

      <hr className="h-4 border-l border-gray-300 mx-1" />

      <div className="flex items-center gap-4 p-2">
        <span className="text-sm">필수</span>
        <button
          type="button"
          onClick={onToggleRequired}
          className={`w-10 h-6 rounded-full transition-colors flex items-center ${field.required ? 'bg-blue-500' : 'bg-gray-300'}`}
          aria-label="필수 여부 토글"
        >
          <span
            className={`block w-5 h-5 ml-0.5 bg-white rounded-full shadow transform transition-transform ${field.required ? 'translate-x-4' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default FieldToolbar;