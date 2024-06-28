"use client";
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!email || password.length === 0){
      setLoading(false);
      setError('Please fill all the fields');
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });

      // Handle success response
      if (response.status === 200 && response.data.success) {
        setLoading(false);
        // Optionally handle successful login actions (e.g., redirect)
        showAlert('User logged in successfully!');
        setEmail('');
        setError('');
        setPassword('');
        router.push("/profile");
      } else {
        setLoading(false);
        // Handle other response statuses or errors
         showAlert('Login failed:', response.data.error || 'Unexpected error');
         setError('');
      }
    } catch (error) {
      setLoading(false);
      // Handle network or other errors
      showAlert('Error', 'There was an error loggin in!');
      setError('');
      console.error('Error logging in:', error);
    }
  };

  const showAlert = (title, message) => {
    console.log('Alert title:', title); // Add this line for debugging
  
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="min-w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 shadow-md">
          <h1 className="\ font-medium">{title}</h1>
          <p className="my-4 text-lg font-medium">{message}</p>
          <button className="btn rounded-md px-4 py-2 hover:bg-primary-dark" onClick={onClose}>
            OK
          </button>
        </div>
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => {}
    });
  };
  

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-240px)]">
      <div className="border-2 m-4 p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Login</h2>
        <form onSubmit={handleSubmit} className='grid gap-3'>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded placeholder-transparent focus:ring-0"
              placeholder="Email"
            
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Password"
            
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary font-bold py-2 px-4 rounded transition-all duration-300 hover:bg-accent"
          >
            Login
          </button>

          {error &&
            <div className='text-red-600 text-sm font-medium'>{error}</div>
          } 
        </form>
        <div className='text-text m-4 text-center'>New User? <Link href={"/signup"} className='text-primary font-bold'>Sign Up</Link></div>
      </div>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-auto ">
          <div className="loading loading-md text-black"></div>
        </div>
      }
    </div>
  );
}
