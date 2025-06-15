import { create } from 'zustand';
import type { TemplateQuestion } from '@/type/templates';
import { updatePreviewTemplate } from '@/utils/localStorage';

interface CreateState {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  questions: TemplateQuestion[];
  setQuestions: (questions: TemplateQuestion[]) => void;
  setQuestion: (question: TemplateQuestion) => void;
}

export const useCreateStore = create<CreateState>((set, get) => ({
  title: '제목 없는 템플릿',
  setTitle: title => {
    set({ title });
    updatePreviewTemplate({ title });
  },
  description: '',
  setDescription: description => {
    set({ description });
    updatePreviewTemplate({ description });
  },
  questions: [],
  setQuestions: questions => {
    const newQuestions = [...questions];
    set({ questions: newQuestions });
    updatePreviewTemplate({ questions: newQuestions });
  },
  setQuestion: question => {
    const questions = get().questions;
    const newQuestions = questions.map(item => item.id === question.id ? question : item);
    set({ questions: newQuestions });
    updatePreviewTemplate({ questions: newQuestions });
  }
}));
