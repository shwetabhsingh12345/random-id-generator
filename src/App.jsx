import React, { useState, useEffect } from 'react';

function App() {
  const apiUrl = "https://randomuser.me/api";
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className='w-full h-screen bg-gray-100 p-4 flex flex-col items-center justify-center'>
      {userData && (
        <div className='bg-white rounded-lg shadow-lg p-8 max-w-md'>
          <div className='mb-4'>
            <img src={userData.results[0].picture.large} alt="Profile" className='w-32 h-32 mx-auto rounded-full' />
          </div>
          <h2 className='font-bold text-lg text-center mb-2'>
            Name: {userData.results[0].name.first} {userData.results[0].name.last}
          </h2>
          <p className='text-gray-700 text-center mb-4'>{userData.results[0].email}</p>
          <p className='text-gray-700'>Gender: {(userData.results[0].gender)[0].toUpperCase()+(userData.results[0].gender).slice(1)}</p>
          <p className='text-gray-700 mb-4'>
            Location: {userData.results[0].location.city}, {userData.results[0].location.country}
          </p>
        </div>
      )}

      <button onClick={fetchData} className='mt-4 px-5 py-3 rounded-md bg-green-500 text-white focus:outline-none active:bg-green-900 hover:bg-green-600'>
        Fetch New Data
      </button>
    </div>
  );
}

export default App;
