import React, { useState } from 'react';
import Button from '../components/Atoms/Button';
import TitleInput from '../components/Atoms/TitleInput';
import DescriptionInput from '../components/Atoms/DescriptionInput';
import FormLabel from '../components/Atoms/FormLabel';
import FieldLabel from '../components/Molecules/FieldLabel';
import FieldContent from '../components/Molecules/FieldContents';
import FieldToolbar from '../components/Molecules/FieldToolbar';
import type { Template, TemplateField } from '../data/templates';
import { useNavigate } from 'react-router';
import { useAlert } from '@/hooks/useAlert';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [title, setTitle] = useState('제목 없는 템플릿');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<TemplateField[]>([]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: `fld-${fields.length + 1}`,
        type: 'text',
        label: '제목 없는 질문',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(fields.length === 0) {
      await showAlert('질문을 추가해주세요.', { cancel: false });
      return;
    }

    const optionCheck = fields.filter((field) => field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown').some((field) => field.options?.length === 0);
    if(optionCheck) {
      await showAlert('옵션을 추가해주세요.', { cancel: false });
      return;
    }

    const templates = localStorage.getItem('templates');
    const newTemplate: Template = {
      id: `tpl-${templates?.length ? templates?.length + 1 : 1}`,
      title,
      description,
      fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTemplates = templates ? [...JSON.parse(templates), newTemplate] : [newTemplate];
    localStorage.setItem('templates', JSON.stringify(newTemplates));

    navigate('/');
  }

  return (
    <div className="h-full w-full flex flex-col justify-center py-12">
      <h2 className="text-2xl font-bold mb-6">새 템플릿 생성</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mx-auto">
        <div>
          <FormLabel>제목</FormLabel>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="템플릿 제목을 입력하세요"
            id="template-title"
          />
        </div>
        <div>
          <FormLabel>설명</FormLabel>
          <DescriptionInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="템플릿 설명"
            rows={1}
            id="template-description"
          />
        </div>
        <div className="flex flex-col gap-10">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex flex-col gap-2 border border-gray-300 rounded px-4 py-5">
              <FieldLabel idx={idx} fields={fields} setFields={setFields} />
              <FieldContent idx={idx} fields={fields} setFields={setFields} />
              <FieldToolbar idx={idx} fields={fields} setFields={setFields} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-5">
          <Button type="button" onClick={handleAddField}>질문 추가</Button>
        </div>
        <Button type="submit" onClick={handleSubmit}>저장</Button>
      </form>
    </div>
  );
};

export default CreatePage; 