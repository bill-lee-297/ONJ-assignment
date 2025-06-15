import useTemplates from '../service/getTemplates';
import { useParams } from 'react-router';
import Box from '../components/Atoms/Box';
import Button from '@/components/Atoms/Button';
import { useNavigate } from 'react-router';
import type { Template, TemplateQuestion } from '../type/templates';
import DetailQuestionOptions from '@/components/Molecules/DetailQuestionOptions';
import MenuTitle from '@/components/Atoms/MenuTitle';
import ContentTitle from '@/components/Atoms/ContentTitle';
import ContentDesc from '@/components/Atoms/ContentDesc';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const filteredTemplates = useTemplates('detail', id || '') as Template;

  if (!filteredTemplates) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <MenuTitle>템플릿 상세보기</MenuTitle>
        <Button onClick={handleEdit}>수정</Button>
      </div>
      <Box>
        <ContentTitle>{filteredTemplates.title || ''}</ContentTitle>
        <ContentDesc>{filteredTemplates.description || ''}</ContentDesc>
      </Box>
      <div className="flex flex-col gap-2">
        {filteredTemplates.questions.map((question: TemplateQuestion) => (
          <Box key={question.id}>
            <div className="text-gray-500">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <DetailQuestionOptions type={question.type} options={question.options || []} />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
