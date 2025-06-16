import type { Question } from '@/types/templates';

const validateTitle = (title: string) => {
  if (title.length === 0 || title === null || title === undefined) {
    return '제목을 입력해주세요.';
  }
  return null;
};

const validateQuestions = (questions: Question[]) => {
  if (questions.length === 0 || questions === null || questions === undefined) {
    return '질문을 추가해주세요.';
  }
  const optionCheck = questions
    .filter(question => question.type === 'radio' || question.type === 'checkbox' || question.type === 'dropdown')
    .some(question => question.options?.length === 0 || question.options?.some(option => option === ''));
  if (optionCheck) {
    return '옵션을 추가해주세요.';
  }
  return null;
};

export { validateTitle, validateQuestions };
