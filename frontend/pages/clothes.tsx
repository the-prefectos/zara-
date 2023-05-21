import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Home.css';
import './css/collections.css'

const getClothesData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/clothes');
    return response.data;
  } catch (error) {
    console.error('Error fetching cloths data:', error);
    throw error;
  }
};

const ClothesPage: React.FC = () => {
  const [clothesdata, setClothesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClothesData();
        setClothesData(data);
      } catch (error) {
        console.error('Error fetching clothes data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Clothes Collections</h1>
      <div className="collection-grid">
        {clothesdata.map((item) => (
          <div key={item._id} className="collection-box">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesPage;
