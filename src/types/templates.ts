export type QuestionType = 'text' | 'checkbox' | 'dropdown' | 'radio';

export interface Question {
  id: string;
  type: QuestionType;
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
  questions: Question[];
}

export interface QuestionProps {
  questions: Question[];
  idx: number;
  setQuestions: (questions: Question[]) => void;
}
