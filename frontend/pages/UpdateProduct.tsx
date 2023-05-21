import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAdminAuth from './adminAuth';
import './css/Add.css';

interface AddProps {
    itemId: string;
  collection: string;
  
}

const UpdateProduct: React.FC = () => {
  useAdminAuth()
    const router = useRouter();
    const { itemId, collection } = router.query;
    
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/${collection}/${itemId}`, { name, image, price, desc } ,{headers : {Authorization : `Bearer ${localStorage.token}`}})
      .then((res) => {
        console.log(res);
        router.push(`/DetailsPage?itemId=${itemId}&collection=${collection}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>EDIT Product</h1>
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
          UPDATE 
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
