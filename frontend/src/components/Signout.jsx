import React from 'react';
import axios from 'axios';

const Signout = ({ onSignout }) => {
  const handleSignout = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      await axios.post('http://127.0.0.1:8000/accounts/signout/', null, config);
      localStorage.removeItem('token');
      onSignout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleSignout}>Sign out</button>
  );
};

export default Signout;