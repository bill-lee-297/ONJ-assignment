interface ContentTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ContentTitle = ({ children, className }: ContentTitleProps) => {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
};

export default ContentTitle;
