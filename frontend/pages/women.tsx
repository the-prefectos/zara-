import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Link from 'next/link';
import './css/Home.css';
import './css/collections.css'

const getWomenData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/women');
    return response.data;
  } catch (error) {
    console.error('Error fetching women data:', error);
    throw error;
  }
};

const WomenPage: React.FC = () => {
  const [womenData, setWomenData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWomenData();
        setWomenData(data);
      } catch (error) {
        console.error('Error fetching women data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Women Collections</h1>
      <div className="collection-grid">
        {womenData.map((item) => (
          <div key={item._id} className="collection-box">
            <img src={item.image} alt={item.name} />
            <Link href={`/DetailsPage?itemId=${item._id}&collection=women`}>
            <h2>{item.name}</h2>
            </Link>
       
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenPage;
