import { useEffect, useState } from 'react';

import Box from '@/components/Atoms/Box';
import ContentDesc from '@/components/Atoms/ContentDesc';
import ContentTitle from '@/components/Atoms/ContentTitle';
import MenuTitle from '@/components/Atoms/MenuTitle';
import DetailQuestionOptions from '@/components/DetailQuestionOptions';
import { getPreviewTemplate } from '@/db/preview';
import type { Template, Question } from '@/types/templates';

const PreviewPage = () => {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    setPreviewTemplate(getPreviewTemplate() as Template);

    window.addEventListener('storage', () => {
      setPreviewTemplate(getPreviewTemplate() as Template);
    });

    return () => {
      window.removeEventListener('storage', () => {
        setPreviewTemplate(getPreviewTemplate() as Template);
      });
    };
  }, []);

  if (previewTemplate === null || previewTemplate.title === '' || previewTemplate.questions === null) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }

  return (
    !previewTemplate.title ? (
      <div>템플릿을 찾을 수 없습니다.</div>
    ) : (
      <div>
        <MenuTitle className="mb-6">템플릿 미리보기</MenuTitle>
        <Box className="mb-4">
          <ContentTitle>{previewTemplate.title || ''}</ContentTitle>
          <ContentDesc>{previewTemplate.description || ''}</ContentDesc>
        </Box>
        <div className="flex flex-col gap-2">
          {previewTemplate.questions?.map((question: Question) => (
            <Box key={question.id} className="mb-4">
              <div className="text-gray-500">
                {question.label}
                {question.required && <span className="text-red-500">*</span>}
              </div>
              <DetailQuestionOptions type={question.type} options={question.options || []} />
            </Box>
          ))}
        </div>
      </div>
    )
  );
};

export default PreviewPage;
