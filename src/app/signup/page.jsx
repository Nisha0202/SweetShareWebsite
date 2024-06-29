"use client";
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`/api/user/signup/email?email=${email}`);
      return response.data.exists;
    } catch (error) {
      throw new Error('Error checking email');
    }
  };

  const signupUser = async (username, email, password) => {
    try {
      const response = await axios.post('/api/user/signup', {
        username,
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('Error signing up');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(!email || !username || password.length === 0){

      setLoading(false);
      setError('Please fill all the fields');
      return;
    }
  
    if (password.length < 5) {
      setError(true);
      setLoading(false);
      setError('Password is too short');
      return;
    }
  
    // Check if email exists
    checkEmailExists(email)
      .then((emailExists) => {
        if (emailExists) {
          setLoading(false);
          showAlert('Error', 'You have signed up before, please Log in.');
          router.push('/'); 
          return Promise.reject('Email already exists');
        }
  
        // Proceed to sign up
        return signupUser(username, email, password);
      })
      .then((response) => {
  
        if (response.status === 200) {
          setLoading(false);
          showAlert('Success', 'You have signed up successfully!');
          setUsername('');
          setEmail('');
          setPassword('');
          setError(false);
          router.push('/login');
        } else {
          setLoading(false);
          showAlert('Error', 'There was an error signing up. Please try again.');
          setError(false);
        }
      })
      .catch((error) => {
        if (error !== 'Email already exists') {
          setLoading(false);
          showAlert('Error', 'There was an error signing up. Please try again.');
          setError(false);
        }
      });
  };
  
  
  const showAlert = (title, message) => {
    console.log('Alert title:', title); // Add this line for debugging
  
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 shadow-md">
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

  // const showAlert = (title, message) => {
  //   confirmAlert({
  //     title: title,
  //     message: message,
  //     buttons: [
  //       {
  //         label: 'OK',
  //         onClick: () => { }
  //       }
  //     ]
  //   });
  // };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-240px)]">
      <div className="p-8 rounded-md border-2 w-full max-w-md">
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
            className="w-full bg-secondary font-bold py-2 px-4 rounded hover:bg-accent"
          >
            Sign Up
          </button>
          {error &&
            <div className='text-red-600 text-sm font-medium'>{error}</div>
          }
        </form>
        <div className='text-text m-4 text-center'>Already User? <Link href={"/login"} className='text-primary font-bold'>Log In</Link></div>
      </div>

      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-auto ">
          <div className="loading loading-md text-black"></div>
        </div>
      }
    </div>
  );
}
