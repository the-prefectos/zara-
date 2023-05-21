import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { decode } from 'jsonwebtoken';

const useAdminAuth = () => {
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const decodedToken = decode(token);

      if (!decodedToken || !decodedToken.user.is_admin) {
        router.push('/unauthorized');
        return;
      }
    } catch (error) {
      router.push('/login');
    }
  }, []);
  return null; 
};

export default useAdminAuth;
