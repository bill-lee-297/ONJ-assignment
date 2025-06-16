import { MdDeleteOutline } from 'react-icons/md';
import type { Question } from '@/types/templates';
import ToggleButton from '@/components/Atoms/ToggleButton';
import { useCreateStore } from '@/store/createStore';
import { memo } from 'react';
import IconButton from '@/components/Atoms/IconButton';

interface QuestionToolbarProps {
  question: Question;
}

const QuestionToolbar = memo(({ question }: QuestionToolbarProps) => {
  const deleteQuestion = useCreateStore(state => state.deleteQuestion);
  const setQuestion = useCreateStore(state => state.setQuestion);

  const onToggleRequired = () => {
    if (!question) return;
    const newQuestion = { ...question, required: !question.required };
    setQuestion(newQuestion);
  };

  const onDelete = () => {
    if (!question) return;
    deleteQuestion(question.id);
  };

  if (!question) {
    return null;
  }

  return (
    <div className="flex justify-end items-center border-t border-gray-300 pt-2 mt-4">
      <IconButton 
        onClick={onDelete} 
        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
      >
        <MdDeleteOutline size={24} />
      </IconButton>

      <hr className="h-4 border-l border-gray-300 mx-1" />

      <div className="flex items-center gap-4 p-2">
        <span className="text-sm">필수</span>
        <ToggleButton onToggleRequired={onToggleRequired} required={question.required || false} />
      </div>
    </div>
  );
});

export default QuestionToolbar; 