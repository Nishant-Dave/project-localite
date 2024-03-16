import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You are logged out!')
    window.location.href = '/login'; 
  };

  return (
    <button className="text-primary" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;


