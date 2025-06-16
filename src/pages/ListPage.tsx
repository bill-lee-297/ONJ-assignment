import { useEffect, useState, useCallback } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Box from '@/components/Atoms/Box';
import ContentDesc from '@/components/Atoms/ContentDesc';
import ContentTitle from '@/components/Atoms/ContentTitle';
import IconButton from '@/components/Atoms/IconButton';
import MenuTitle from '@/components/Atoms/MenuTitle';
import { getTemplates, deleteTemplate, getAllTemplates } from '@/db/templates';
import useAlert from '@/hooks/useAlert';
import { useSearchStore } from '@/store/searchStore';
import type { Template } from '@/types/templates';
import formatDate from '@/utils/date';
import { truncateText } from '@/utils/string';

const ListPage = () => {
  const searchKeyword = useSearchStore(state => state.searchKeyword);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const showAlert = useAlert();

  const getTemplatesList = useCallback(() => {
    setTemplates(getTemplates(searchKeyword) as Template[]);
    setTotalCount(getAllTemplates().length);
  }, [searchKeyword]);

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert('템플릿을 삭제하시겠습니까?', { cancel: true });
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
    <div className="w-full h-full">
      <MenuTitle className="mb-6">템플릿 목록</MenuTitle>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {templates?.map((tpl: Template) => (
          <Box key={tpl.id} onClick={() => navigate(`/detail/${tpl.id}`)} className="hover:bg-gray-50 cursor-pointer">
            <ContentTitle>{truncateText(tpl.title, 20)}</ContentTitle>
            <ContentDesc>{truncateText(tpl.description, 45)}</ContentDesc>
            <div className="flex items-center justify-between gap-0.5">
              <div className="text-sm text-gray-500">{formatDate(tpl.updatedAt)}</div>
              <div className="flex" onClick={e => e.stopPropagation()}>
                <IconButton onClick={() => navigate(`/edit/${tpl.id}`)}>
                  <MdOutlineEdit size={20} />
                </IconButton>
                <IconButton onClick={() => handleDelete(tpl.id)}>
                  <MdDeleteOutline size={20} />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
      </div>
      {totalCount === 0 && <div className="text-center text-gray-400 py-8">등록된 템플릿이 없습니다.</div>}
      {templates.length === 0 && totalCount > 0 && (
        <div className="text-center text-gray-400 py-8">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default ListPage;
