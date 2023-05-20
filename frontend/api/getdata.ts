import axios from 'axios';

export const getdata = async () => {
  try {
    const response = await axios.get('http://localhost:5000/men');
    return response.data;
  } catch (error) {
    console.error('Error fetching example data:', error);
    throw error;
  }
};
