interface OptionsRowProps {
  key?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const OptionsRow = ({ key, children, className = '', onClick }: OptionsRowProps) => {
  return (
    <div key={key} className={`flex items-center gap-2 cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default OptionsRow;