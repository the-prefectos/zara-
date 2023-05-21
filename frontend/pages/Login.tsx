import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import './css/login.css';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log('Login successful:', response.data);
           console.log(response.data.user.fname);
      localStorage.setItem('userName', response.data.user.fname);
      localStorage.setItem( 'isAdmin' ,response.data.user.is_admin);
      console.log(localStorage.getItem('isAdmin'));
      
      router.push('/Home');
    } catch (error: any) {
      console.error('Login failed:', error.message);
    }
  }

 
  

  return (
    <>
      <form onSubmit={handleSubmit} className="container-login">
        <div className="Left-login-form">
          <h3 className="login-heading">Login</h3>
          <div className="input-text-box">
            <input
              onChange={handleChange}
              className="input-text"
              type="text"
              id="email"
              name="email"
              placeholder="E-MAIL"
            />
          </div>
          <div className="input-text-box">
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
            />
          </div>
          <a className="forgotpassword" href="#">
            HAVE YOU FORGOTTEN YOUR PASSWORD?
          </a>
          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </div>

        <div className="right-login-form">
          <h5>NEED AN ACCOUNT ?</h5>

          <Link legacyBehavior href="/register">
            <a className="create-btn">REGISTER</a>
          </Link>
        </div>
      </form>

      <div className="signup-footer">
        <div className="list-group">
          <h6 className="header-heading">HELP</h6>
          <a href="#" className="list">
            SHOP AT ZARA.COM
          </a>
          <a href="#" className="list">
            PRODUCT
          </a>
          <a href="#" className="list">
            PAYMENT
          </a>
          <a href="#" className="list">
            SHIPPING
          </a>
          <a href="#" className="list">
            EXCHANGES AND RETURNS
          </a>
          <a href="#" className="list">
            SHOPS AND COMPANY
          </a>
          <a href="#" className="list">
            CLOTHES COLLECTION
          </a>
          <a href="#" className="list">
            PROGRAMME
          </a>
        </div>

        <div className="list-group">
          <h6 className="header-heading">FOLLOW-US</h6>
          <a href="#" className="list">
            NEWSLETTER
          </a>
          <a href="#" className="list">
            INSTAGRAM
          </a>
          <a href="#" className="list">
            FACEBOOK
          </a>
          <a href="#" className="list">
            TWITTER
          </a>
          <a href="#" className="list">
            PINTEREST
          </a>
          <a href="#" className="list">
            YOUTUBE
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
