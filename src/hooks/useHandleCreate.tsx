import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { getAllTemplates, saveTemplate } from '@/db/templates';
import useAlert from '@/hooks/useAlert';
import type { CreateTemplate, Template } from '@/types/templates';
import { validateTitle, validateQuestions } from '@/utils/validate';

const useHandleCreate = ({ title, description, questions }: CreateTemplate) => {
  const navigate = useNavigate();
  const showAlert = useAlert();

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

  return handleCreate;
};

export default useHandleCreate;
