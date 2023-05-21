import React, { useState } from 'react';
import axios from 'axios';
import './css/register.css';
import { useRouter } from 'next/router';
const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e :any) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e :any) => {
    e.preventDefault();
  
    try {
      const formDataWithAdmin = { ...formData, is_admin: isAdmin };
      const response = await axios.post('http://localhost:5000/register', formDataWithAdmin);
      console.log(response.data);
      router.push('/Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>ZARA</h1>
      <h2 className="headingform">PERSONAL DETAILS</h2>
      <div className="changeform-btn">
        <div className="form-check">
        <input
  className="reg1"
  type="radio"
  name="flexRadioDefault"
  id="flexRadioDefault1"
  checked={!isAdmin}
  onChange={() => setIsAdmin(false)}
/>
          <label className="reg1" htmlFor="flexRadioDefault1">
            USER
          </label>
        </div>
        <div className="form-check">
        <input
  className="reg2"
  type="radio"
  name="flexRadioDefault"
  id="flexRadioDefault2"
  checked={isAdmin}
  onChange={() => setIsAdmin(true)}
/>
          <label className="reg2" htmlFor="flexRadioDefault2">
            ADMIN
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container">
        <label htmlFor="email"> </label>
        <div className="Left-form">
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
              type="text"
              id="password"
              name="password"
              placeholder="PASSWORD"
            />
          </div>
          <input className="confirme" type="pass" placeholder="REPEAT PASSWORD" />
          <input onChange={handleChange} className="sur" type="na" name='lname' placeholder="SURNAME" />
          <div className="input-text-box">
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="fname"
              placeholder="NAME"
            />
          </div>
        </div>

        <div className="checkbox">
          <div>
            <input
              title="check"
              className="form-input-checkbox__input"
              type="checkbox"
              name="newsletterCheck"
              data-qa-input-qualifier="newsletterCheck"
              value="false"
            />
          </div>
          <div>
            <h6 className="checkbox__label">I wish to receive Zara news on my e-mail</h6>
          </div>
        </div>

        <div className="checkbox2">
          <div>
            <input
              title="check"
              className="form-input-checkbox__input"
              type="checkbox"
              name="newsletterCheck"
              data-qa-input-qualifier="newsletterCheck"
              value="false"
            />
          </div>
          <div>
            <h6 className="checkbox__label">I ACCEPT THE PRIVACY STATEMENT</h6>
          </div>
        </div>
        <button type="submit" className="signupbtn">
          REGISTER
        </button>
      </form>

      <div className="signup-header">
        <div className="list-group">
          <h6 className="header-heading1">FOLLOW-US</h6>
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

        <div className="list-group">
          <h6 className="header-heading2">COMPANY</h6>
          <a href="#" className="list2">
            ABOUT US
          </a>
          <a href="#" className="list2">
            JOIN LIFE
          </a>
          <a href="#" className="list2">
            OFFICES
          </a>
          <a href="#" className="list2">
            STORES
          </a>
          <a href="#" className="list2">
            WORK WITH US
          </a>
        </div>

        <div className="list-group">
          <h6 className="header-heading3">POLICIES</h6>
          <a href="#" className="list3">
            PRIVACY POLICY
          </a>
          <a href="#" className="list3">
            PURCHASE CONDITIONS
          </a>
          <a href="#" className="list3">
            COOKIES SETTINGS
          </a>
        </div>
      </div>
    </>
  );
};

export default Signup;
