import { IoEyeOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

import IconButton from './Atoms/IconButton';
import NavItem from './Atoms/NavItem';
import Search from './Molecules/Search';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCreate = location.pathname === '/create' || location.pathname.includes('/edit');

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <header className="w-full h-16 border-b border-gray-200 mb-10">
      <div className="flex flex-row items-center justify-between h-full w-full mx-auto px-4 max-w-2xl">
        <nav className="w-full">
          <ul className="flex flex-row items-center justify-start gap-4">
            <Link to="/">
              <NavItem>홈</NavItem>
            </Link>
            <Link to="/create">
              <NavItem>생성</NavItem>
            </Link>
          </ul>
        </nav>
        <div className="w-full flex flex-row items-center justify-end">
          {isHome && <Search />}
          {isCreate && (
            <IconButton onClick={handlePreview}>
              <IoEyeOutline size={24} />
              <p className="text-md font-medium">미리보기</p>
            </IconButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
