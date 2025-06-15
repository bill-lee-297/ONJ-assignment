import Button from './Atoms/Button';
import { useCreateStore } from '@/store/createStore';
import { useAlert } from '@/hooks/useAlert';
import { useParams, useNavigate } from 'react-router';
import type { Template } from '@/type/templates';
import { v4 as uuidv4 } from 'uuid';

const CreateAction = () => {
  const showAlert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const title = useCreateStore(state => state.title);
  const description = useCreateStore(state => state.description);
  const fields = useCreateStore(state => state.fields);

  const validate = async () => {
    if (fields.length === 0) {
      await showAlert('질문을 추가해주세요.', { cancel: false });
      return false;
    }
    const optionCheck = fields
      .filter(field => field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown')
      .some(field => field.options?.length === 0 || field.options?.some(option => option === ''));
    if (optionCheck) {
      await showAlert('옵션을 추가해주세요.', { cancel: false });
      return false;
    }
    return true;
  };

  const handleCreate = async (e: React.FormEvent, mode: 'create' | 'duplicate' = 'create') => {
    e.preventDefault();

    if (!(await validate())) {
      return;
    }

    if (mode === 'duplicate') {
      const confirmed = await showAlert('새로운 템플릿으로 생성하시겠습니까?', { cancel: true });
      if (!confirmed) return;
    }

    const templates = localStorage.getItem('templates');
    const newTemplate: Template = {
      id: `tpl-${uuidv4()}`,
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
    if (!confirmed) return;
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');
    const updatedTemplates = templates.map((tpl: Template) =>
      tpl.id === id ? { ...tpl, title, description, fields, updatedAt: new Date().toISOString() } : tpl,
    );
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    navigate('/');
  };

  return isEdit ? (
    <div className="flex items-center justify-between gap-5">
      <Button onClick={e => handleCreate(e, 'duplicate')}>새로운 템플릿으로 생성</Button>
      <Button onClick={handleModify}>저장</Button>
    </div>
  ) : (
    <div className="flex items-center justify-end gap-5">
      <Button onClick={handleCreate}>저장</Button>
    </div>
  );
};

export default CreateAction;
