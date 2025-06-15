import type { Template } from '@/type/templates';

type PreviewTemplate = Partial<Template>;

const getPreviewTemplate = (): PreviewTemplate => {
  try {
    const stored = localStorage.getItem('previewTemplate');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to parse previewTemplate from localStorage:', error);
    return {};
  }
};

const updatePreviewTemplate = (updates: PreviewTemplate) => {
  const currentTemplate = getPreviewTemplate();
  const newTemplate = {
    ...currentTemplate,
    ...updates,
  };
  try {
    localStorage.setItem('previewTemplate', JSON.stringify(newTemplate));
  } catch (error) {
    console.error('Failed to save previewTemplate to localStorage:', error);
  }
};

export { getPreviewTemplate, updatePreviewTemplate };