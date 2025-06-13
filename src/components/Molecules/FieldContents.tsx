import type { TemplateQuestionProps } from '../../type/templates';
import Options from '../Atoms/Options';

const FieldContent = ({ idx, fields, setFields }: TemplateQuestionProps) => {
  const field = fields[idx];

  const renderFieldContent = () => {
    switch (field.type) {
      case 'text':
        return <div className="text-md text-gray-500 border-b border-gray-300 px-5 py-2 cursor-default">단답형 텍스트</div>;
      case 'radio':
      case 'checkbox':
      case 'dropdown':
        return <Options idx={idx} fields={fields} setFields={setFields} type={field.type} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex items-center gap-10">
      {renderFieldContent()}
    </div>
  );
};

export default FieldContent;