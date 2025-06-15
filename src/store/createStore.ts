import { create } from 'zustand';
import type { TemplateField } from '@/type/templates';
import { updatePreviewTemplate } from '@/utils/localStorage';

interface CreateState {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  fields: TemplateField[];
  setFields: (fields: TemplateField[]) => void;
  setField: (field: TemplateField) => void;
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
  fields: [],
  setFields: fields => {
    const newFields = [...fields];
    set({ fields: newFields });
    updatePreviewTemplate({ fields: newFields });
  },
  setField: field => {
    const fields = get().fields;
    const newFields = fields.map(item => item.id === field.id ? field : item);
    set({ fields: newFields });
    updatePreviewTemplate({ fields: newFields });
  }
}));
