import { MdDeleteOutline } from 'react-icons/md';
import type { TemplateQuestion } from '../../type/templates';
import ToggleButton from '../Atoms/ToggleButton';
import { useCreateStore } from '@/store/createStore';
import { memo, useCallback } from 'react';

interface QuestionToolbarProps {
  question: TemplateQuestion;
}

const QuestionToolbar = memo(({ question }: QuestionToolbarProps) => {
  const setQuestions = useCreateStore(state => state.setQuestions);
  const questions = useCreateStore(state => state.questions);
  const setQuestion = useCreateStore(state => state.setQuestion);

  const handleDeleteQuestion = useCallback((questionId: string) => {
    const newQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(newQuestions);
  }, [questions, setQuestions]);

  const onToggleRequired = useCallback(() => {
    if (!question) return;
    const newQuestion = { ...question, required: !question.required };
    setQuestion(newQuestion);
  }, [question, setQuestion]);

  const onDelete = useCallback(() => {
    if (!question) return;
    handleDeleteQuestion(question.id);
  }, [question, handleDeleteQuestion]);

  if (!question) {
    return null;
  }

  return (
    <div className="flex justify-end items-center border-t border-gray-300 pt-2 mt-4">
      <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <MdDeleteOutline size={24} className="text-gray-500 hover:text-gray-900 transition" />
      </button>

      <hr className="h-4 border-l border-gray-300 mx-1" />

      <div className="flex items-center gap-4 p-2">
        <span className="text-sm">필수</span>
        <ToggleButton onToggleRequired={onToggleRequired} required={question.required || false} />
      </div>
    </div>
  );
});

export default QuestionToolbar; 