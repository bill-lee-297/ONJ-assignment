import type { Template } from '@/type/templates';

const getTemplates = (type: 'search' | 'detail', text: string): Template[] | Template | null => {
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');

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

const deleteTemplate = (id: string) => {
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');
  const newTemplates = templates.filter((tpl: Template) => tpl.id !== id);
  localStorage.setItem('templates', JSON.stringify(newTemplates));
};

export { getTemplates, deleteTemplate };
