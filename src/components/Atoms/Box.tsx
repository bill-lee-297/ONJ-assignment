interface BoxProps {
  key?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Box = ({ key, children, onClick, className = '' }: BoxProps) => {
  return (
    <div
      key={key}
      className={`flex flex-col gap-2 border border-gray-300 rounded-md mb-4 p-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Box;
