// "use client"

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AppContext = createContext();

// export const AppWrapper = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCurrentUser = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${process.env.DOMAIN}/api/currentprofile`);
//       setUser(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.error('Error fetching user details:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, [fetchCurrentUser]);

//   return (
//     <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchCurrentUser }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://sweet-share-latest.vercel.app/api/currentprofile');
      setUser(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function will only be created once

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
