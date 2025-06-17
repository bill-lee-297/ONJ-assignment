interface ActionButtonRowProps {
  children: React.ReactNode;
}

const ActionButtonRow = ({ children }: ActionButtonRowProps) => {
  return <div className="flex flex-col md:flex-row items-center justify-between gap-3">{children}</div>;
};

export default ActionButtonRow;
