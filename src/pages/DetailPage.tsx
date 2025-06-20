import { MdOutlineEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';

import ActionButtonRow from '@/components/Atoms/ActionButtonRow';
import Box from '@/components/Atoms/Box';
import ContentDesc from '@/components/Atoms/ContentDesc';
import ContentTitle from '@/components/Atoms/ContentTitle';
import IconButton from '@/components/Atoms/IconButton';
import MenuTitle from '@/components/Atoms/MenuTitle';
import DetailQuestionOptions from '@/components/DetailQuestionOptions';
import { getTemplate, deleteTemplate } from '@/db/templates';
import useAlert from '@/hooks/useAlert';
import type { Template, Question } from '@/types/templates';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const filteredTemplates = getTemplate(id || '') as Template;
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
    const result = deleteTemplate(id);
    if (result) {
      navigate('/');
    } else {
      showAlert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <MenuTitle>템플릿 상세보기</MenuTitle>
        <ActionButtonRow>
          <IconButton onClick={() => handleDelete(id || '')}>
            <MdDeleteOutline size={20} />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <MdOutlineEdit size={20} />
          </IconButton>
        </ActionButtonRow>
      </div>
      <Box className="mb-4">
        <ContentTitle>{filteredTemplates.title || ''}</ContentTitle>
        <ContentDesc>{filteredTemplates.description || ''}</ContentDesc>
      </Box>
      <div className="flex flex-col gap-2">
        {filteredTemplates.questions.map((question: Question) => (
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
