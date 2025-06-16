import React, { memo } from 'react';

import { useCreateStore } from '@/store/createStore';
import type { Question } from '@/types/templates';

interface QuestionLabelProps {
  question: Question;
}

const QuestionLabel = memo(({ question }: QuestionLabelProps) => {
  const setQuestion = useCreateStore(state => state.setQuestion);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: 'label' | 'options') => {
    if (!question) return;

    if (key === 'label') {
      const newQuestion = { ...question, label: e.target.value };
      setQuestion(newQuestion);
    } else if (key === 'options') {
      const type = e.target.value as 'radio' | 'text' | 'checkbox' | 'dropdown';
      if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
        const newQuestion = { ...question, type, options: [] };
        setQuestion(newQuestion);
      } else {
        const newQuestion = {
          id: question.id,
          type,
          label: question.label,
        };
        setQuestion(newQuestion);
      }
    }
  };

  return (
    <div key={question.id} className="flex items-center gap-5">
      <div className="flex-7">
        <input
          type="text"
          value={question.label}
          onChange={e => onValueChange(e, 'label')}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={`질문`}
        />
      </div>
      <div className="flex-3">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={question.type}
          onChange={e => onValueChange(e, 'options')}
        >
          <option value="radio">객관식</option>
          <option value="text">텍스트</option>
          <option value="checkbox">체크박스</option>
          <option value="dropdown">드롭다운</option>
        </select>
      </div>
    </div>
  );
});

export default QuestionLabel;
