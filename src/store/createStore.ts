import { create } from 'zustand';

import { updatePreviewTemplate } from '@/db/preview';
import type { Question } from '@/types/templates';

interface CreateState {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setQuestion: (question: Question) => void;
  deleteQuestion: (questionId: string) => void;
  resetStore: () => void;
}

const initialState = {
  title: '제목 없는 템플릿',
  description: '',
  questions: [],
};

export const useCreateStore = create<CreateState>((set, get) => ({
  ...initialState,
  setTitle: title => {
    set({ title });
    updatePreviewTemplate({ title });
  },
  setDescription: description => {
    set({ description });
    updatePreviewTemplate({ description });
  },
  setQuestions: questions => {
    const newQuestions = [...questions];
    set({ questions: newQuestions });
    updatePreviewTemplate({ questions: newQuestions });
  },
  setQuestion: question => {
    const questions = get().questions;
    const newQuestions = questions.map(item => (item.id === question.id ? question : item));
    set({ questions: newQuestions });
    updatePreviewTemplate({ questions: newQuestions });
  },
  deleteQuestion: questionId => {
    const questions = get().questions;
    const newQuestions = questions.filter(question => question.id !== questionId);
    set({ questions: newQuestions });
    updatePreviewTemplate({ questions: newQuestions });
  },
  resetStore: () => {
    set(initialState);
    updatePreviewTemplate(initialState);
  },
}));
