import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found. Redirecting...");
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Logout error:", error);
        // If 401 or any error, still redirect and remove token
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
}


