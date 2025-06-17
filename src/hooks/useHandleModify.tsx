// src/hooks/useHandleModify.ts
import { useNavigate } from 'react-router-dom';

import { getAllTemplates, saveTemplate } from '@/db/templates';
import useAlert from '@/hooks/useAlert';
import type { CreateTemplate, Template } from '@/types/templates';
import { validateQuestions, validateTitle } from '@/utils/validate';

const useHandleModify = ({ id, title, description, questions }: CreateTemplate & Pick<Template, 'id'>) => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleModify = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validateTitle(title);
    if (titleError) {
      await showAlert(titleError, { cancel: false });
      return false;
    }

    const error = validateQuestions(questions);
    if (error) {
      await showAlert(error, { cancel: false });
      return false;
    }

    const confirmed = await showAlert('이대로 저장하시겠습니까?', { cancel: true });
    if (!confirmed) return;

    const templates = getAllTemplates();
    const updatedTemplates = templates.map((tpl: Template) =>
      tpl.id === id
        ? {
            ...tpl,
            title,
            description,
            questions,
            updatedAt: new Date().toISOString(),
          }
        : tpl,
    );

    const result = saveTemplate(updatedTemplates);
    if (result) {
      navigate('/');
    } else {
      showAlert('저장에 실패했습니다.');
    }
  };

  return handleModify;
};

export default useHandleModify;
