import { useSearchStore } from '../../store/searchStore';

const Search = () => {
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);

  return (
    <div className="flex flex-row items-center justify-end w-full">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="템플릿 이름으로 검색..."
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default Search;