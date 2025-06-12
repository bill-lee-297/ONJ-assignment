import React, { useEffect, useState } from 'react';
import Box from '../components/Atoms/Box';
import type { Template, TemplateField } from '../data/templates';
import DetailFieldOptions from '@/components/Molecules/DetailFieldOptions';

const PreviewPage: React.FC = () => {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    setPreviewTemplate(JSON.parse(localStorage.getItem('previewTemplate') || '{}') as Template);

    window.addEventListener('storage', (e) => {
      const previewTemplate = JSON.parse(e.newValue || '{}') as Template;
      setPreviewTemplate(previewTemplate);
    });

    return () => {
      window.removeEventListener('storage', () => {});
    }
  }, []);

  if(!previewTemplate) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }


  return (
    <div>
      <Box>
        <h1 className="text-2xl font-bold">{previewTemplate.title || ''}</h1>
        <p className="text-gray-500">{previewTemplate.description || ''}</p>
      </Box>
      <div className="flex flex-col gap-2">
        {previewTemplate.fields.map((field: TemplateField) => (
          <Box key={field.id}>
            <div className="text-gray-500">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </div>
            <DetailFieldOptions type={field.type} options={field.options || []} />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage; 