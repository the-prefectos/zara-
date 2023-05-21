import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from './Navbar';
import './css/Home.css';
import './css/collections.css'


const getMenData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/men');
    return response.data;
  } catch (error) {
    console.error('Error fetching men data:', error);
    throw error;
  }
};

const MenPage: React.FC = () => {
  const [menData, setMenData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenData();
        setMenData(data);
      } catch (error) {
        console.error('Error fetching men data:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
    <Navbar />
    <h1>Men Collections</h1>
    <div className="collection-grid">
      {menData.map((item) => (
        <div key={item._id} className="collection-box">
          <img src={item.image} alt={item.name} />
          <Link href={`/DetailsPage?itemId=${item._id}&collection=men`}>
            <h2>{item.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
};

export default MenPage;
