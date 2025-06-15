import { useCreateStore } from '@/store/createStore';
import Box from '../Atoms/Box';

const CreateTitle = () => {
  const title = useCreateStore(state => state.title);
  const setTitle = useCreateStore(state => state.setTitle);
  const description = useCreateStore(state => state.description);
  const setDescription = useCreateStore(state => state.setDescription);

  return (
    <Box className="pb-6 gap-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full text-xl border-b-2 border-gray-300 px-3 py-2 focus:border-gray-500"
        placeholder="템플릿 제목을 입력하세요"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full text-md border-b border-gray-300 px-3 py-2"
        placeholder="템플릿 설명"
        rows={1}
      />
    </Box>
  );
};

export default CreateTitle;
