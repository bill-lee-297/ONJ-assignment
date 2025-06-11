import React from 'react';
import useTemplates from '../service/getTemplates';
import { useParams } from 'react-router';
import Box from '../components/Atoms/Box';

import type { Template, TemplateField } from '../data/templates';
import DetailFieldOptions from '@/components/Molecules/DetailFieldOptions';

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const filteredTemplates = useTemplates('detail', id || '') as Template;

  if(!filteredTemplates) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }


  return (
    <div>
      <Box>
        <h1 className="text-2xl font-bold">{filteredTemplates.title || ''}</h1>
        <p className="text-gray-500">{filteredTemplates.description || ''}</p>
      </Box>
      <div className="flex flex-col gap-2">
        {filteredTemplates.fields.map((field: TemplateField) => (
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

export default DetailPage; 