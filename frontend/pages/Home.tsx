import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import './css/Home.css';

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLoginClick = () => {
    router.push('/Login');
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const images = [
    "https://i.ibb.co/c1CRGR1/pic-6.jpg",
    "https://i.ibb.co/6FqcQR4/pic-7.jpg",
    "https://i.ibb.co/gzDSwFb/pic-5.jpg",
    "https://i.ibb.co/gJKWVzJ/pic-4.jpg",
    "https://i.ibb.co/S5YpT8C/pic-3.jpg",
    "https://i.ibb.co/tqbL9zF/pic-2.jpg",
    "https://i.ibb.co/HzQwMvL/pic-1.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsDropdownOpen(false)
    router.push('/Login');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">ZARA</div>
        <div className="navbar-right">
  <input type="text" placeholder="Search" />
  <button className="button">Bucket</button>
  {userName ? (
        <div className="dropdown">
          <button className="button" id='un' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? '.' : '.'} {userName}
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <a id='out' onClick={handleLogout}>Logout</a>
            </ul>
          )}
        </div>
      ) : (
        <button className="button" onClick={handleLoginClick}>LOG IN</button>
      )}
  <button className="button">HELP</button>
</div>
      </nav>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
          >
            <Image src={image} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div className={`categories-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="menu" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <ul className={`categories-list ${isMenuOpen ? 'active' : ''}`}>
            <li onClick={() => handleCategoryClick('MEN')}>MEN</li>
            <li onClick={() => handleCategoryClick('WOMEN')}>WOMEN</li>
            <li onClick={() => handleCategoryClick('KIDS')}>KIDS</li>
            <li onClick={() => handleCategoryClick('BEAUTY')}>BEAUTY</li>
          </ul>
        )}
        {selectedCategory && (
          <ul className="category-choices">
            {selectedCategory === 'MEN' && (
              <>
                <li>Choice 1</li>
                <li>Choice 2</li>
                <li>Choice 3</li>
                <li>Choice 4</li>
              </>
            )}
            {selectedCategory === 'WOMEN' && (
              <>
                <li>Choice 5</li>
                <li>Choice 6</li>
                <li>Choice 7</li>
                <li>Choice 8</li>
              </>
            )}
            {selectedCategory === 'KIDS' && (
              <>
                <li>Choice 9</li>
                <li>Choice 10</li>
                <li>Choice 11</li>
                <li>Choice 12</li>
              </>
            )}
            {selectedCategory === 'BEAUTY' && (
              <>
                <li>Choice 13</li>
                <li>Choice 14</li>
                <li>Choice 15</li>
                <li>Choice 16</li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
