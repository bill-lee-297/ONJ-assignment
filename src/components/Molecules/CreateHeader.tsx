interface CreateHeaderProps {
  title: string;
}

const CreateHeader = ({ title }: CreateHeaderProps) => {

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
  </div>
  );
};

export default CreateHeader;