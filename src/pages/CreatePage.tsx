import { useEffect } from 'react';
import type { Template } from '@/types/templates';
import { useParams } from 'react-router-dom';
import CreateTitle from '@/components/Molecules/CreateTitle';
import MenuTitle from '@/components/Atoms/MenuTitle';
import { useCreateStore } from '@/store/createStore';
import CreateQuestion from '@/components/Create/CreateQuestion';
import CreateAction from '@/components/Create/CreateAction';
import { getAllTemplates } from '@/db/templates';
import { v4 as uuidv4 } from 'uuid';

const CreatePage = () => {
  const { id } = useParams();

  const setTitle = useCreateStore(state => state.setTitle);
  const setDescription = useCreateStore(state => state.setDescription);
  const setQuestions = useCreateStore(state => state.setQuestions);
  const resetStore = useCreateStore(state => state.resetStore);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const templates = getAllTemplates();
      const template = templates.find((tpl: Template) => tpl.id === id);
      if (template) {
        setTitle(template.title);
        setDescription(template.description);
        setQuestions(template.questions);
      }
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
  );
};

export default CreatePage;
