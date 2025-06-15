import { MdDeleteOutline } from 'react-icons/md';
import type { TemplateField } from '../../type/templates';
import ToggleButton from '../Atoms/ToggleButton';
import { useCreateStore } from '@/store/createStore';
import { memo, useCallback } from 'react';

interface FieldToolbarProps {
  field: TemplateField;
}

const FieldToolbar = memo(({ field }: FieldToolbarProps) => {
  const setField = useCreateStore(state => state.setField);

  const handleDeleteField = useCallback((field: TemplateField) => {
    setField(field);
  }, [setField]);

  const onToggleRequired = useCallback(() => {
    if (!field) return;
    const newField = { ...field, required: !field.required };
      setField(newField);
  }, [field, setField]);

  const onDelete = useCallback(() => {
    if (!field) return;
    handleDeleteField(field);
  }, [field, handleDeleteField]);

  if (!field) {
    return null;
  }

  return (
    <div className="flex justify-end items-center border-t border-gray-300 pt-2 mt-4">
      <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <MdDeleteOutline size={24} className="text-gray-500 hover:text-gray-900 transition" />
      </button>

      <hr className="h-4 border-l border-gray-300 mx-1" />

      <div className="flex items-center gap-4 p-2">
        <span className="text-sm">필수</span>
        <ToggleButton onToggleRequired={onToggleRequired} required={field.required || false} />
      </div>
    </div>
  );
});

export default FieldToolbar;