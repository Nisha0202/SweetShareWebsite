"use client";
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 5) {
      setError(true);
      return;
    }

    try {
      // Make a POST request to your server domain (adjust the URL accordingly)
      const response = await axios.post('/api/user/signup', {
        username,
        email,
        password,
      });
      console.log('User signed up:', response.data); // Log the response data
      setLoading(false);
      showAlert('Success', 'You have signed up successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      

    } catch (error) {
      setLoading(false);
      console.error('Error signing up:', error);
      showAlert('Error', 'There was an error signing up. Please try again.');
      setError(false);
    }
  };

  const showAlert = (title, message) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-240px)] absolute z-10">
      <div className=" p-8 rounded-md border-2 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Sign Up</h2>
        <form onSubmit={handleSubmit} className='grid gap-3'>
          <div className="input-container">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Username"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded placeholder-transparent "
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary font-bold py-2 px-4 rounded hover:bg-accent"
          >
            Sign Up
          </button>
          {error &&
            <div className='text-red-600 text-sm font-medium'>Password is too short</div>
          }
        </form>
        <div className='text-text m-4 text-center'>Already User? <Link href={"/login"} className='text-primary font-bold'>Log In</Link>  </div>
      </div>

      {Loading &&
        <span className="loading loading-spinner loading-md relative z-20 top-1/2 left-1/2"></span>
      }
    
    </div>
  );
}
