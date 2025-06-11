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

export const dummyTemplates: Template[] = [
  {
    id: 'tpl-1',
    title: '만족도 조사',
    description: '서비스 만족도를 조사하는 설문 템플릿입니다.',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    fields: [
      { id: 'fld-1', type: 'text', label: '이름', required: true },
      { id: 'fld-2', type: 'dropdown', label: '만족도', options: ['매우 만족', '만족', '보통', '불만족'], required: true },
      { id: 'fld-3', type: 'text', label: '의견', required: false }
    ]
  },
  {
    id: 'tpl-2',
    title: '참가 신청서',
    description: '행사 참가자를 모집하는 신청서 템플릿입니다.',
    createdAt: '2024-06-02T09:00:00Z',
    updatedAt: '2024-06-02T09:00:00Z',
    fields: [
      { id: 'fld-1', type: 'text', label: '이름', required: true },
      { id: 'fld-2', type: 'text', label: '연락처', required: true },
      { id: 'fld-3', type: 'checkbox', label: '참가 희망 세션', options: ['A', 'B', 'C'], required: false }
    ]
  }
];