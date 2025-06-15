const NavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-md font-medium text-lg tracking-wider">
      {children}
    </li>
  );
};

export default NavItem; 