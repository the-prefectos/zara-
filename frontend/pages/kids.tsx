import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from './Navbar';
import './css/Home.css';
import './css/collections.css'

const getKidsData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/kids');
    return response.data;
  } catch (error) {
    console.error('Error fetching kids data:', error);
    throw error;
  }
};

const KidsPage: React.FC = () => {
  const [kidsdata, setKidsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKidsData();
        setKidsData(data);
      } catch (error) {
        console.error('Error fetching kids data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Kids Collections</h1>
      <div className="collection-grid">
        {kidsdata.map((item) => (
          <div key={item._id} className="collection-box">
            <img src={item.image} alt={item.name} />
            <Link href={`/DetailsPage?itemId=${item._id}&collection=kids`}>
              <h2>{item.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsPage;
