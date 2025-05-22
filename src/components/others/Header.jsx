import React, { useState } from 'react';

const Header = ({ data, changeUser }) => {
  const [user, setUser] = useState('');
  
  const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
    changeUser('');
  };

  return (
    <div className='flex items-end justify-between text-white'>
      <h1 className='text-2xl font-medium'>
        Hello <br/> 
        <span className='text-3xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
          {data ? data.firstName || 'Employee' : 'Admin'} 🚀
        </span> 
      </h1>
      <button 
        onClick={logoutUser}
        className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
      >
        Logout
      </button>
    </div>
  );
};

export default Header;