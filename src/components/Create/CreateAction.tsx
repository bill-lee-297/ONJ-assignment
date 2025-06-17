import { FaRegSave } from 'react-icons/fa';
import { GrDuplicate } from 'react-icons/gr';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ActionButtonRow from '../Atoms/ActionButtonRow';

import IconButton from '@/components/Atoms/IconButton';
import { getAllTemplates, saveTemplate } from '@/db/templates';
import useAlert from '@/hooks/useAlert';
import { useCreateStore } from '@/store/createStore';
import type { Template } from '@/types/templates';
import { validateTitle, validateQuestions } from '@/utils/validate';

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

    const titleError = validateTitle(title);
    if (titleError) {
      await showAlert(titleError, { cancel: false });
      return false;
    }

    const questionError = validateQuestions(questions);
    if (questionError) {
      await showAlert(questionError, { cancel: false });
      return false;
    }

    if (mode === 'duplicate') {
      const confirmed = await showAlert('새로운 템플릿으로 생성하시겠습니까?', { cancel: true });
      if (!confirmed) return;
    } else {
      const confirmed = await showAlert('이대로 저장하시겠습니까?', { cancel: true });
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
    const newTemplates = templates ? [...templates, newTemplate] : [newTemplate];
    const result = saveTemplate(newTemplates);
    if (result) {
      navigate('/');
    } else {
      showAlert('저장에 실패했습니다.');
    }
  };

  const handleModify = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateQuestions(questions);
    if (error) {
      await showAlert(error, { cancel: false });
      return false;
    }
    const confirmed = await showAlert('이대로 저장하시겠습니까?', { cancel: true });
    if (!confirmed) return;
    const templates = getAllTemplates();
    const updatedTemplates = templates.map((tpl: Template) =>
      tpl.id === id ? { ...tpl, title, description, questions, updatedAt: new Date().toISOString() } : tpl,
    );
    const result = saveTemplate(updatedTemplates);
    if (result) {
      navigate('/');
    } else {
      showAlert('저장에 실패했습니다.');
    }
  };

  return isEdit ? (
    <ActionButtonRow>
      <IconButton onClick={e => handleCreate(e, 'duplicate')}>
        <GrDuplicate size={20} />
      </IconButton>
      <IconButton onClick={handleModify}>
        <FaRegSave size={20} />
      </IconButton>
    </ActionButtonRow>
  ) : (
    <ActionButtonRow>
      <IconButton onClick={handleCreate}>
        <FaRegSave size={20} />
      </IconButton>
    </ActionButtonRow>
  );
};

export default CreateAction;
