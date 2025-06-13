import React, { useState, useEffect } from 'react';
import Button from '../components/Atoms/Button';
import FieldLabel from '../components/Molecules/FieldLabel';
import FieldContent from '../components/Molecules/FieldContents';
import FieldToolbar from '../components/Molecules/FieldToolbar';
import type { Template, TemplateField } from '../type/templates';
import { useNavigate, useParams } from 'react-router';
import { useAlert } from '@/hooks/useAlert';
import CreateHeader from '../components/Molecules/CreateHeader';
import CreateTitle from '../components/Molecules/CreateTitle';

const CreatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [title, setTitle] = useState('제목 없는 템플릿');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<TemplateField[]>([]);
  const isEdit = Boolean(id);

  // 수정 모드일 때 초기값 세팅
  useEffect(() => {
    if (isEdit) {
      const templates = JSON.parse(localStorage.getItem('templates') || '[]');
      const template = templates.find((tpl: Template) => tpl.id === id);
      if (template) {
        setTitle(template.title);
        setDescription(template.description);
        setFields(template.fields);
      }
    }
  }, [id, isEdit]);

  useEffect(() => {
    localStorage.setItem('previewTemplate', JSON.stringify({ title, description, fields }));
  }, [title, description, fields]);

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

  const validate = async () => {
    if(fields.length === 0) {
      await showAlert('질문을 추가해주세요.', { cancel: false });
      return false;
    }
    const optionCheck = fields.filter((field) => field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown').some((field) => field.options?.length === 0);
    if(optionCheck) {
      await showAlert('옵션을 추가해주세요.', { cancel: false });
      return false;
    }
    return true;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!await validate()){
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
  };

  const handleModify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;
    const confirmed = await showAlert('이대로 수정하시겠습니까?', { cancel: true });
    if(!confirmed) return;
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');
    const updatedTemplates = templates.map((tpl: Template) =>
      tpl.id === id
        ? { ...tpl, title, description, fields, updatedAt: new Date().toISOString() }
        : tpl
    );
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    navigate('/');
  };

  const handleCreateNewTemplateFromEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;
    const confirmed = await showAlert('새로운 템플릿으로 생성하시겠습니까?', { cancel: true });
    if(!confirmed) return;
    const templates = localStorage.getItem('templates');
    const newTemplate: Template = {
      id: `tpl-${templates?.length ? templates?.length + 1 : 1}`,
      title,
      description,
      fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const newTemplates = templates ? [...JSON.parse(templates), newTemplate] : [newTemplate];
    localStorage.setItem('templates', JSON.stringify(newTemplates));
    navigate(`/${newTemplate.id}`);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <CreateHeader title={isEdit ? '템플릿 수정' : '새 템플릿 생성'} />

      <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={isEdit ? handleModify : handleCreate}>

        <CreateTitle title={title} description={description} setTitle={setTitle} setDescription={setDescription} />

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
          <Button type="button" onClick={handleAddField}>+ 질문 추가</Button>
        </div>

        {isEdit ? (
          <div className="flex items-center justify-between mt-5 gap-5">
            <Button type="button" onClick={handleCreateNewTemplateFromEdit}>새로운 템플릿으로 생성</Button>
            <Button type="submit">수정</Button>
          </div>
        ) : (
          <div className="flex items-center justify-end mt-5 gap-5">
            <Button type="submit">저장</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePage; 