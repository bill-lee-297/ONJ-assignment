import Button from "../Atoms/Button";
import type { Template } from "../../type/templates";

interface CreateHeaderProps {
  title: string;
  preview: Pick<Template, 'title' | 'description' | 'fields'>;
}

const CreateHeader = ({ title, preview }: CreateHeaderProps) => {

  const handlePreview = () => {
    localStorage.setItem('previewTemplate', JSON.stringify(preview));

    window.open('/preview', '_blank');
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={handlePreview}>미리보기</Button>
  </div>
  );
};

export default CreateHeader;