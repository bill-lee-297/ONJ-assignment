import { memo } from 'react';
import Options from './Options';
import type { Question } from '@/types/templates';

interface QuestionContentProps {
  question: Question;
}

const QuestionContent = memo(({ question }: QuestionContentProps) => {
  if (!question) {
    return null;
  }

  return (
    <div className="flex items-center gap-10">
      {question.type === 'text' && (
        <div className="text-md text-gray-500 border-b border-gray-300 px-5 py-2 cursor-default">단답형 텍스트</div>
      )}
      {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'dropdown') && (
        <Options question={question} type={question.type} />
      )}
    </div>
  );
});

export default QuestionContent; 