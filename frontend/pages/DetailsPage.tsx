import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from './Navbar';
import './css/Details.css';
import './css/Home.css';
import Link from 'next/link';


interface Item {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
}

const getItemDetails = async (itemId: string, collection: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/${collection}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

const deleteItem = async (itemId: string, collection: string) => {
  try {
    const response = await axios.delete(`http://localhost:5000/${collection}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { itemId, collection } = router.query;

  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof itemId === 'string' && typeof collection === 'string') {
          const data = await getItemDetails(itemId, collection);
          setItem(data);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchData();
  }, [itemId, collection]);

  const handleDelete = async () => {
    try {
      if (typeof itemId === 'string' && typeof collection === 'string') {
        await deleteItem(itemId, collection);
        // Redirect to a success page or update the UI accordingly
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Product Details</h1>
      {item ? (
        <div className="grid-container">
          <div className="image-container">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="details-container">
            <h2>{item.name}</h2>
            <p>Category: {item.gen}</p>
            <p>Price: {item.price}</p>
            <p>Description: {item.desc}</p>
            <div className="button-container">
              <Link href={`/UpdateProduct?itemId=${item._id}&&collection=${collection}`}>
                <button className="update-button">Update Product</button>
              </Link>
              <button className="delete-button" onClick={handleDelete}>
                Delete Product
              </button>
              <Link href={`/Add?collection=${collection}`}>
                <button className="delete-button">Add Product</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
  );
};

export default DetailsPage;
