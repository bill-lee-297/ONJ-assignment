import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import type { Template } from '@/type/templates';
import { getTemplates, deleteTemplate } from '@/service/templates';
import Box from '@/components/Atoms/Box';
import useAlert from '@/hooks/useAlert';
import { useSearchStore } from '@/store/searchStore';
import MenuTitle from '@/components/Atoms/MenuTitle';
import ContentTitle from '@/components/Atoms/ContentTitle';
import ContentDesc from '@/components/Atoms/ContentDesc';
import formatDate from '@/utils/date';
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import IconButton from '@/components/Atoms/IconButton';

const ListPage = () => {
  const searchKeyword = useSearchStore(state => state.searchKeyword);
  const [templates, setTemplates] = useState<Template[]>([]);
  const navigate = useNavigate();
  const showAlert = useAlert();

  const getTemplatesList = useCallback(() => {
    setTemplates(getTemplates('search', searchKeyword) as Template[]);
  }, [searchKeyword]);

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert('삭제하시겠습니까?', { cancel: true });
    if (!confirmed) return;
    deleteTemplate(id);
    getTemplatesList();
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      getTemplatesList();
    });

    return () => {
      window.removeEventListener('storage', () => {
        getTemplatesList();
      });
    };
  }, [getTemplatesList]);

  useEffect(() => {
    getTemplatesList();
  }, [searchKeyword, getTemplatesList]);

  return (
    <div>
      <MenuTitle className="mb-6">템플릿 목록</MenuTitle>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {templates?.map((tpl: Template) => (
          <Box key={tpl.id} onClick={() => navigate(`/detail/${tpl.id}`)}>
            <div className="flex flex-col gap-1 cursor-pointer">
              <ContentTitle>{tpl.title}</ContentTitle>
              <ContentDesc>{tpl.description}</ContentDesc>
              <div className="text-sm text-gray-500">
                {formatDate(tpl.updatedAt)}
              </div>
            </div>
            <div className="flex justify-end mt-1 gap-0.5">
              <IconButton onClick={() => navigate(`/edit/${tpl.id}`)}>
                <MdOutlineEdit size={20} />
              </IconButton>
              <IconButton onClick={() => handleDelete(tpl.id)}>
                <MdDeleteOutline size={20} />
              </IconButton>
            </div>
          </Box>
        ))}
        {templates.length === 0 && <div className="text-center text-gray-400 py-8">검색 결과가 없습니다.</div>}
      </div>
    </div>
  );
};

export default ListPage;
