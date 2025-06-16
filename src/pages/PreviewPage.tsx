import { useEffect, useState } from 'react';
import Box from '@/components/Atoms/Box';
import type { Template, Question } from '@/types/templates';
import DetailQuestionOptions from '@/components/DetailQuestionOptions';
import MenuTitle from '@/components/Atoms/MenuTitle';
import ContentTitle from '@/components/Atoms/ContentTitle';
import ContentDesc from '@/components/Atoms/ContentDesc';
import { getPreviewTemplate } from '@/db/preview';

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

  if (!previewTemplate) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <MenuTitle className="mb-6">템플릿 미리보기</MenuTitle>
      <Box className="mb-4">
        <ContentTitle>{previewTemplate.title || ''}</ContentTitle>
        <ContentDesc>{previewTemplate.description || ''}</ContentDesc>
      </Box>
      <div className="flex flex-col gap-2">
        {previewTemplate.questions.map((question: Question) => (
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
  );
};

export default PreviewPage;
