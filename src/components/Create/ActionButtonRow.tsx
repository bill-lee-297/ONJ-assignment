interface CreateButtonRowProps {
  children: React.ReactNode;
}

const ActionButtonRow = ({ children }: CreateButtonRowProps) => {
  return <div className="flex flex-col md:flex-row items-center justify-between gap-3">{children}</div>;
};

export default ActionButtonRow;
