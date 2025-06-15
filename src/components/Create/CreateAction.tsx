import { useCreateStore } from '@/store/createStore';
import useAlert from '@/hooks/useAlert';
import { useParams, useNavigate } from 'react-router';
import type { Template } from '@/type/templates';
import { v4 as uuidv4 } from 'uuid';
import validateQuestions from '@/utils/validate';
import { getAllTemplates, saveTemplate } from '@/service/templates';
import { IoDuplicateSharp } from "react-icons/io5";
import { FaRegSave } from 'react-icons/fa';
import IconButton from '@/components/Atoms/IconButton';

const CreateAction = () => {
  const showAlert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const title = useCreateStore(state => state.title);
  const description = useCreateStore(state => state.description);
  const questions = useCreateStore(state => state.questions);

  const handleCreate = async (e: React.FormEvent, mode: 'create' | 'duplicate' = 'create') => {
    e.preventDefault();

    const error = validateQuestions(questions);
    if (error) {
      await showAlert(error, { cancel: false });
      return false;
    }

    if (mode === 'duplicate') {
      const confirmed = await showAlert('새로운 템플릿으로 생성하시겠습니까?', { cancel: true });
      if (!confirmed) return;
    }

    const templates = getAllTemplates();
    const newTemplate: Template = {
      id: `tpl-${uuidv4()}`,
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newTemplates = templates ? [...JSON.parse(templates), newTemplate] : [newTemplate];
    saveTemplate(newTemplates);
    navigate('/');
  };

  const handleModify = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateQuestions(questions);
    if (error) {
      await showAlert(error, { cancel: false });
      return false;
    }
    const confirmed = await showAlert('이대로 수정하시겠습니까?', { cancel: true });
    if (!confirmed) return;
    const templates = getAllTemplates();
    const updatedTemplates = templates.map((tpl: Template) =>
      tpl.id === id ? { ...tpl, title, description, questions, updatedAt: new Date().toISOString() } : tpl,
    );
    saveTemplate(updatedTemplates);
    navigate('/');
  };

  return isEdit ? (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      <IconButton onClick={e => handleCreate(e, 'duplicate')}>
        <IoDuplicateSharp size={20} />
      </IconButton>
      <IconButton onClick={handleModify}>
        <FaRegSave size={20} />
      </IconButton>
    </div>
  ) : (
    <div className="flex items-center justify-end gap-3">
      <IconButton onClick={handleCreate}>
        <FaRegSave size={20} />
      </IconButton>
    </div>
  );
};

export default CreateAction;
