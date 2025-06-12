export type TemplateFieldType = 'text' | 'checkbox' | 'dropdown' | 'radio';

export interface TemplateField {
  id: string;
  type: TemplateFieldType;
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
  fields: TemplateField[];
}

export interface TemplateQuestionProps {
  fields: TemplateField[];
  idx: number;
  setFields: (fields: TemplateField[]) => void;
}