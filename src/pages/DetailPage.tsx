import { getTemplates, deleteTemplate } from '@/service/templates';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@/components/Atoms/Box';
import type { Template, TemplateQuestion } from '@/type/templates';
import DetailQuestionOptions from '@/components/DetailQuestionOptions';
import MenuTitle from '@/components/Atoms/MenuTitle';
import ContentTitle from '@/components/Atoms/ContentTitle';
import ContentDesc from '@/components/Atoms/ContentDesc';
import { MdOutlineEdit } from "react-icons/md";
import IconButton from '@/components/Atoms/IconButton';
import { MdDeleteOutline } from "react-icons/md";
import useAlert from '@/hooks/useAlert';


const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const filteredTemplates = getTemplates('detail', id || '') as Template;
  const showAlert = useAlert();

  if (!filteredTemplates) {
    return <div>템플릿을 찾을 수 없습니다.</div>;
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert('삭제하시겠습니까?', { cancel: true });
    if (!confirmed) return;
    deleteTemplate(id);
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <MenuTitle>템플릿 상세보기</MenuTitle>
        <div className="flex items-center justify-end gap-0.5">
          <IconButton onClick={() => handleDelete(id || '')}>
            <MdDeleteOutline size={20} />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <MdOutlineEdit size={20} />
          </IconButton>
        </div>
      </div>
      <Box className="mb-4">
        <ContentTitle>{filteredTemplates.title || ''}</ContentTitle>
        <ContentDesc>{filteredTemplates.description || ''}</ContentDesc>
      </Box>
      <div className="flex flex-col gap-2">
        {filteredTemplates.questions.map((question: TemplateQuestion) => (
          <Box key={question.id} className="mb-4">
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
