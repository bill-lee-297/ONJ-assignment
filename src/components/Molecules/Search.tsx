import { useState, useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore';
import useDebounce from '@/hooks/useDebounce';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const setSearchKeyword = useSearchStore(state => state.setSearchKeyword);
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchKeyword(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchKeyword]);

  return (
    <div className="flex flex-row items-center justify-end w-full">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="템플릿 이름으로 검색..."
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default Search;
