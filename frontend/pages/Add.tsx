import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import './css/Add.css';

interface AddProps {
  collection: string;
}

const Add: React.FC = () => {
    const router = useRouter();
    const { collection } = router.query;
    
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [gen, setGen] = useState('');
  const [desc, setDesc] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/${collection}/`, { name, image, price, desc })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
           Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        <button type="submit" className="submitButton">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
