interface BoxProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Box = ({ children, onClick, className = '' }: BoxProps) => {
  return (
    <div
      className={`flex flex-col gap-2 border border-gray-300 rounded-md p-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Box;
