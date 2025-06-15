export type TemplateQuestionType = 'text' | 'checkbox' | 'dropdown' | 'radio';

export interface TemplateQuestion {
  id: string;
  type: TemplateQuestionType;
  label: string;
  options?: string[];
  required?: boolean;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: TemplateQuestion[];
}

export interface TemplateQuestionProps {
  questions: TemplateQuestion[];
  idx: number;
  setQuestions: (questions: TemplateQuestion[]) => void;
}
