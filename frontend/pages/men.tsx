import { useEffect, useState } from 'react';
import axios from 'axios';

const getdata = async () => {
  try {
    const response = await axios.get('http://localhost:5000/men');
    return response.data;
  } catch (error) {
    console.error('Error fetching example data:', error);
    throw error;
  }
};


const ExamplePage: React.FC = () => {
    const [menData, setMenData] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getdata();
          setMenData(data);
        } catch (error) {
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>Men Data</h1>
        {menData.map((item) => (
          <div key={item._id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.gen}</p>
            <p>{item.price}</p>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ExamplePage;
  