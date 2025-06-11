import React from 'react';
import { useParams } from 'react-router';
import { dummyTemplates } from '../data/templates';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = dummyTemplates.find((tpl) => tpl.id === id);

  if (!template) {
    return <div>존재하지 않는 템플릿입니다.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
      <p className="text-gray-600 mb-2">{template.description}</p>
      {/* 추후 편집 폼 추가 예정 */}
    </div>
  );
};

export default EditPage; 