import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import './css/Home.css';




const HomePage: React.FC = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');


  const router = useRouter();
  
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);



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
     console.log("my log" ,localStorage.getItem('isAdmin'))
    }
    const checkAdmin = localStorage.getItem('isAdmin');
    if (checkAdmin) {
      setIsAdmin(checkAdmin === 'true');
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
     <Link href={'./Dashboard'}   > { isAdmin  && <button className="button" id='dash'>DASHBOARD</button>}  </Link> 
        <div className="navbar-right">
  <input type="text" placeholder="Search" />
  <button className="button">Bucket</button>
  {userName ? (
        <div className="dropdown">
          <button className="button" id='un' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? '.' : '.'} {userName}
          </button>
          {isDropdownOpen && (
            <a className="dropdown-menu">
              <a id='out' onClick={handleLogout}>Logout</a>
            </a>
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
                <li>COLLECTIONS</li>
                <li>CROCHET</li>
                <li>BASICS</li>
                <li>COSTUMES</li>
                  <li>SHIRTS</li>
             <li>T-SHIRTS</li>
            <li>JACKETS | OVERSHIRTS</li>
                 <li>PANTS</li>
                 <li>JEANS</li>
              <li>SHORTS</li>
               <li>SWEATS | HOODIES</li>
              </>
            )}
            {selectedCategory === 'WOMEN' && (
              <>
              <li>COLLECTIONS</li>
                <li>BLAZERS</li>
<li>JACKETS | TRENCH</li>
<li>WITHOUT SLEEVES</li>
<li>DRESSES | COMBINATIONS</li>
<li>SHIRTS | GOWNS</li>
<li>T-SHIRTS | SWEATS</li>
              </>
            )}
            {selectedCategory === 'KIDS' && (
              <>
              <li>COLLECTIONS</li>
                <li>COLONIES DE VACANCES NEW</li>
<li>TRUE NEUTRALS NEW</li>
<li>GIRL | 6-14 years old</li>
<li>BOY | 6-14 years old</li>
<li>BABY GIRL | 9 months - 6 years</li>
<li>BABY BOY | 9 months - 6 years</li>
<li>ACCESSORIES | SHOES</li>
              </>
            )}
            {selectedCategory === 'BEAUTY' && (
              <>
                  <li>View All</li>
        <li>TUTORIALS</li>
        <li>Lips</li>
        <li>Eyes</li>
        <li>Visage</li>
        <li>NAIL POLISH</li>
        <li>PAINT BRUSHES</li>
        <li>SHADE FINDER</li>
        <li>RECHARGES</li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
