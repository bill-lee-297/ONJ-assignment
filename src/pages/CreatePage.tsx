import { useEffect } from 'react';
import type { Template } from '@/type/templates';
import { useParams } from 'react-router';
import CreateTitle from '@/components/Molecules/CreateTitle';
import MenuTitle from '@/components/Atoms/MenuTitle';
import { useCreateStore } from '@/store/createStore';
import CreateQuestion from '@/components/Create/CreateQuestion';
import CreateAction from '@/components/Create/CreateAction';
import { getAllTemplates } from '@/service/templates';

const CreatePage = () => {
  const { id } = useParams();

  const setTitle = useCreateStore(state => state.setTitle);
  const setDescription = useCreateStore(state => state.setDescription);
  const setQuestions = useCreateStore(state => state.setQuestions);

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
      setTitle('');
      setDescription('');
      setQuestions([]);
    }
  }, [id, isEdit, setTitle, setDescription, setQuestions]);

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
