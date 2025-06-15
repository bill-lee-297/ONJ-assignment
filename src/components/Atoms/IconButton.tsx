interface IconButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const IconButton = ({ children, onClick, className }: IconButtonProps) => {
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={`flex flex-row items-center gap-2 p-3 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-md cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;