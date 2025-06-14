interface MenuTitleProps {
  children: React.ReactNode;
  className?: string;
}

const MenuTitle = ({ children, className }: MenuTitleProps) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};

export default MenuTitle;
