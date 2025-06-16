import type { Template } from '@/types/templates';

const getAllTemplates = (): Template[] => {
  try {
    return JSON.parse(localStorage.getItem('templates') || '[]');
  } catch (error) {
    console.error('Failed to parse templates from localStorage:', error);
    return [];
  }
};

const getTemplates = (text: string): Template[] | Template | null => {
  try {
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');

    return templates
      .filter((tpl: Template) => tpl.title.toLowerCase().includes(text.toLowerCase()))
      .sort((a: Template, b: Template) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('Failed to parse templates from localStorage:', error);
    return null;
  }
};

const getTemplate = (id: string): Template | null => {
  try {
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');
    return templates.find((tpl: Template) => tpl.id === id) || null;
  } catch (error) {
    console.error('Failed to parse templates from localStorage:', error);
    return null;
  }
};

const saveTemplate = (templates: Template[]) => {
  try {
    localStorage.setItem('templates', JSON.stringify(templates));
    return true;
  } catch (error) {
    console.error('Failed to save templates to localStorage:', error);
    return false;
  }
};

const deleteTemplate = (id: string) => {
  try {
    const templates = JSON.parse(localStorage.getItem('templates') || '[]');
    const newTemplates = templates.filter((tpl: Template) => tpl.id !== id);
    localStorage.setItem('templates', JSON.stringify(newTemplates));
    return true;
  } catch (error) {
    console.error('Failed to delete template from localStorage:', error);
    return false;
  }
};

export { getAllTemplates, getTemplates, getTemplate, saveTemplate, deleteTemplate };
