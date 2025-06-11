interface IcButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const IcButton = ({ children, onClick, className = '', type = 'button' }: IcButtonProps) => {
  return (
    <button type={type} className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default IcButton;