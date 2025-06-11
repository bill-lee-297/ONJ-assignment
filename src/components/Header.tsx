import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex justify-center items-center h-16 bg-background">
      <nav>
        <ul className="flex flex-row gap-4">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/create">생성</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;