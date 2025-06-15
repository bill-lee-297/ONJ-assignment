import type { TemplateQuestion } from '@/type/templates';

const validateQuestions = (questions: TemplateQuestion[]) => {
  if (questions.length === 0) {
    return "질문을 추가해주세요.";
  }
  const optionCheck = questions
    .filter(question => question.type === 'radio' || question.type === 'checkbox' || question.type === 'dropdown')
    .some(question => question.options?.length === 0 || question.options?.some(option => option === ''));
  if (optionCheck) {
    return "옵션을 추가해주세요.";
  }
  return null;
};

export default validateQuestions;