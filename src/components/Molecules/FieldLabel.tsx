import React, { memo, useCallback } from 'react';
import { useCreateStore } from '@/store/createStore';
import type { TemplateField } from '@/type/templates';


interface FieldLabelProps {
  field: TemplateField;
}

const FieldLabel = memo(({ field }: FieldLabelProps) => {
  const setField = useCreateStore(state => state.setField);

  const onValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: 'label' | 'options') => {
    if (!field) return;
    
    if (key === 'label') {
      const newField = { ...field, label: e.target.value };
      setField(newField);
    } else if (key === 'options') {
      const type = e.target.value as 'radio' | 'text' | 'checkbox' | 'dropdown';
      if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
        const newField = { ...field, type, options: [] };
        setField(newField);
      } else {
        const newField = { 
          id: field.id,
          type,
          label: field.label,
        };
        setField(newField);
      }
    }
  }, [field, setField]);

  return (
    <div key={field.id} className="flex items-center gap-5">
      <div className="flex-7">
        <input
          type="text"
          value={field.label}
          onChange={e => onValueChange(e, 'label')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={`질문`}
        />
      </div>
      <div className="flex-3">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={field.type}
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
});

export default FieldLabel;