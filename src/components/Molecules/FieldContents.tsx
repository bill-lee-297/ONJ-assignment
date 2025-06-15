import { memo } from 'react';
import Options from './Options';
import type { TemplateField } from '@/type/templates';

interface FieldContentProps {
  field: TemplateField;
}

const FieldContent = memo(({ field }: FieldContentProps) => {
  if (!field) {
    return null;
  }

  return (
    <div className="flex items-center gap-10">
      {field.type === 'text' && (
        <div className="text-md text-gray-500 border-b border-gray-300 px-5 py-2 cursor-default">단답형 텍스트</div>
      )}
      {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown') && (
        <Options field={field} type={field.type} />
      )}
    </div>
  );
});

export default FieldContent;