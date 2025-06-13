import type { TemplateQuestionProps } from '../../type/templates';


const FieldLabel = ({ idx, fields, setFields }: TemplateQuestionProps) => {

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: 'label' | 'options') => {
    const newFields = [...fields];
    if (key === 'label') {
      newFields[idx] = { ...newFields[idx], [key]: e.target.value };
    } else if (key === 'options') {
      const type = e.target.value as 'radio' | 'text' | 'checkbox' | 'dropdown';
      if(type === 'radio' || type === 'checkbox' || type === 'dropdown') {
        newFields[idx] = { ...newFields[idx], type: type, options: [] };
      } else {
        delete newFields[idx].options;
        newFields[idx] = { ...newFields[idx], type: type };
      }
    }
    setFields(newFields);
  }

  return (
    <div key={fields[idx].id} className="flex items-center gap-5">
      <div className="flex-7">
        <input
          type="text"
          value={fields[idx].label}
          onChange={e => onValueChange(e, 'label')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={`질문`}
        />
      </div>
      <div className="flex-3">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={fields[idx].type}
          onChange={e => onValueChange(e, 'options')}
        >
          <option value="radio">객관식</option>
          <option value="text">텍스트</option>
          <option value="checkbox">체크박스</option>
          <option value="dropdown">드롭다운</option>
        </select>
      </div>
    </div>
  );
};

export default FieldLabel;