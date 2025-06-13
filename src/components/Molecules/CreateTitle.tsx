import TitleInput from "../Atoms/TitleInput";
import DescriptionInput from "../Atoms/DescriptionInput";


interface CreateTitleProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void
}

const CreateTitle = ({ title, description, setTitle, setDescription }: CreateTitleProps) => {
  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded px-4 py-5">
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="템플릿 제목을 입력하세요"
        id="template-title"
      />
      <DescriptionInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="템플릿 설명"
        rows={1}
        id="template-description"
      />
    </div>
  );
};

export default CreateTitle;