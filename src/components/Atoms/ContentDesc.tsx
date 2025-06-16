interface ContentDescProps {
  children: React.ReactNode;
  className?: string;
}

const ContentDesc = ({ children, className }: ContentDescProps) => {
  return <h3 className={`text-md text-gray-500 ${className} ${children ? '' : 'h-6'}`}>{children}</h3>;
};

export default ContentDesc;
