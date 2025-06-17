interface NavItemProps {
  children: React.ReactNode;
}

const NavItem = ({ children }: NavItemProps) => {
  return (
    <li className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-md font-medium text-lg tracking-wider select-none">
      {children}
    </li>
  );
};

export default NavItem;
