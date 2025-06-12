import { Link, useLocation } from "react-router";
import Search from "./Molecules/Search";

const Header = () => {
  // 현재 url에서 home에서만 Search 컴포넌트 렌더링
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="w-full h-16 border-b border-gray-200 mb-10">
      <div className="flex flex-row items-center justify-between h-full w-full mx-auto px-4 max-w-2xl">
        <nav className="w-full">
          <ul className="flex flex-row items-center justify-start gap-4">
            <li><Link to="/">홈</Link></li>
            <li><Link to="/create">생성</Link></li>
          </ul>
        </nav>
        {isHome && <Search />}
      </div>
    </header>
  )
}

export default Header;