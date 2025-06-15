import { useCreateStore } from '@/store/createStore';
import FieldLabel from './Molecules/FieldLabel';
import FieldContent from './Molecules/FieldContents';
import FieldToolbar from './Molecules/FieldToolbar';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoMdAdd } from 'react-icons/io';

const CreateField = () => { 
  const setFields = useCreateStore(state => state.setFields);
  const fields = useCreateStore(state => state.fields);


  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: `fld-${uuidv4()}`,
        type: 'text',
        label: '제목 없는 질문',
      },
    ]);
  };

  useEffect(() => {
    if(fields.length === 0) {
      handleAddField();
    }
  }, [fields]);


  return (
    <div className="flex flex-col gap-10">
      {fields.map(field => (
        <div key={field.id} className="flex flex-col gap-2 border border-gray-300 rounded px-4 py-5">
          <FieldLabel field={field} />
          <FieldContent field={field} />
          <FieldToolbar field={field} />
        </div>
      ))}

      <div className="flex items-center justify-center mt-5">
        <button
          type="button"
          onClick={handleAddField}
          className="border-gray-200 border-2 rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        >
          <IoMdAdd size={24} className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CreateField;
