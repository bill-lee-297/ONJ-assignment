import React, { useState } from 'react';
import { dummyTemplates } from '../data/templates';
import Button from '../components/Atoms/Button';

const ListPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const filteredTemplates = dummyTemplates.filter((tpl) =>
    tpl.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="템플릿 이름으로 검색"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">템플릿 목록</h2>
      <div className="flex flex-col gap-4">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="border rounded-lg p-6 bg-white shadow-sm"
          >
            <div className="font-semibold text-lg">{tpl.title}</div>
            <div className="text-gray-600 my-1">{tpl.description}</div>
            <div className="text-sm text-gray-500">생성일: {tpl.createdAt.slice(0, 10)}</div>
            <div className="mt-4 flex gap-2">
              <Button>미리보기</Button>
              <Button>편집</Button>
              <Button>삭제</Button>
            </div>
          </div>
        ))}
        {filteredTemplates.length === 0 && (
          <div className="text-center text-gray-400 py-8">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ListPage; 