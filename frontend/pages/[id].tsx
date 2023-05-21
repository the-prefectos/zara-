import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const getItemData = async (id:any) => {
  try {
    const response = await axios.get(`http://localhost:5000/kids/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item data:', error);
    throw error;
  }
};

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch item data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItemData(id);
        // Handle data fetching and error handling here
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* Render item details here */}
    </div>
  );
};

export default ProductDetailsPage;
