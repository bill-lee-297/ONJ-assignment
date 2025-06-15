import type { Template } from '@/type/templates';

const getAllTemplates = () => {
  return JSON.parse(localStorage.getItem('templates') || '[]');
};

const getTemplates = (type: 'all' | 'search' | 'detail', text: string): Template[] | Template | null => {
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');

  if (type === 'all') {
    return templates.sort((a: Template, b: Template) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (type === 'search') {
    return templates
      .filter((tpl: Template) => tpl.title.toLowerCase().includes(text))
      .sort((a: Template, b: Template) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (type === 'detail') {
    const template = templates.find((tpl: Template) => tpl.id === text);
    return template ? template : null;
  }

  return [];
};

const saveTemplate = (templates: Template[]) => {
  localStorage.setItem('templates', JSON.stringify(templates));
};

const deleteTemplate = (id: string) => {
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');
  const newTemplates = templates.filter((tpl: Template) => tpl.id !== id);
  localStorage.setItem('templates', JSON.stringify(newTemplates));
};

export { getAllTemplates, getTemplates, saveTemplate, deleteTemplate };
