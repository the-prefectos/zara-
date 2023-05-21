import { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/Login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear()
    setIsDropdownOpen(false);
    router.push('/Login');
  };

  return (
    <nav className="navbar">
      <div className="logo">ZARA</div>
      <div className="navbar-right">
        <input type="text" placeholder="Search" />
        <button className="button">Bucket</button>
        {userName ? (
          <div className="dropdown">
            <button className="button" id="un" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {isDropdownOpen ? '.' : '.'} {userName}
            </button>
            {isDropdownOpen && (
              <a className="dropdown-menu">
                <a id="out" onClick={handleLogout}>
                  Logout
                </a>
              </a>
            )}
          </div>
        ) : (
          <button className="button" onClick={handleLoginClick}>
            LOG IN
          </button>
        )}
        <button className="button">HELP</button>
      </div>
    </nav>
  );
};

export default Navbar;
