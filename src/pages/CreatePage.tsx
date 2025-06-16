import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MenuTitle from '@/components/Atoms/MenuTitle';
import CreateAction from '@/components/Create/CreateAction';
import CreateQuestion from '@/components/Create/CreateQuestion';
import CreateTitle from '@/components/Molecules/CreateTitle';
import { getAllTemplates } from '@/db/templates';
import { useCreateStore } from '@/store/createStore';
import type { Template } from '@/types/templates';

const CreatePage = () => {
  const { id } = useParams();

  const setTitle = useCreateStore(state => state.setTitle);
  const setDescription = useCreateStore(state => state.setDescription);
  const setQuestions = useCreateStore(state => state.setQuestions);
  const resetStore = useCreateStore(state => state.resetStore);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const templates = getAllTemplates();
      const template = templates.find((tpl: Template) => tpl.id === id);
      if (!template) {
        setError('템플릿을 찾을 수 없습니다.');
        return;
      }
      setTitle(template.title);
      setDescription(template.description);
      setQuestions(template.questions);
    } else {
      resetStore();
      setQuestions([
        {
          id: `qst-${uuidv4()}`,
          type: 'text',
          label: '제목 없는 질문',
        },
      ]);
    }
  }, [id, isEdit, setTitle, setDescription, setQuestions, resetStore]);

  return (
    isEdit && error ? (
      <div className="h-full w-full flex flex-col justify-center">
        <div className="text-center">{error}</div>
      </div>
    ) : (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="flex flex-row items-center justify-between mb-6">
        <MenuTitle>{isEdit ? '템플릿 수정' : '새 템플릿 생성'}</MenuTitle>
        <CreateAction />
      </div>

      <form className="flex flex-col gap-4 w-full mx-auto">
        <CreateTitle />
        <CreateQuestion />
      </form>
    </div>
    )
  );
};

export default CreatePage;
