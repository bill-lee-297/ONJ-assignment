const OptionsRow = ({ key, children, className = '', onClick }: { key?: string, children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <div key={key} className={`flex items-center gap-2 cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default OptionsRow;