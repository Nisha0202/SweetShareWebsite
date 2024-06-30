"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/currentprofile');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const AppContext = createContext();

// export const AppWrapper = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch the current user when the component mounts
//     axios.get('/api/currentprofile')
//       .then(response => {
//         setUser(response.data.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, []);


//   return (
//     <AppContext.Provider value={{user, setUser }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
