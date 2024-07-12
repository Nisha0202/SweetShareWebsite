"use client";

import Link from 'next/link';
import { useState, Suspense } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context';

 function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/';
  const { setUser, fetchCurrentUser } = useAppContext();

  const checkEmailExists = async (email) => {
    try {
      // const response = await axios.get(`/api/user/signup/email?email=${email}`);
      const response = await axios.get(`/api/user/signup/email?email=${encodeURIComponent(email)}`);
      return response.data.exists;
    } catch (error) {
      throw new Error('Error checking email');
    }
  };

  const matchUser = async (email, password) => {
    try {
      const response = await axios.post(`/api/user/login`, { email, password });
      return response;
    } catch (error) {
      throw new Error('Error checking email and password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || password.length === 0) {
      setLoading(false);
      setError('Please fill all the fields');
      return;
    }

    checkEmailExists(email)
      .then((emailExists) => {
        if (!emailExists) {
          setLoading(false);
          showAlert('Error', 'You have not signed up before, please Sign Up.');
          router.push('/signup');
          return Promise.reject('Email does not exist');
        }

        return matchUser(email, password);
      })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setUser(response.data.data);
          fetchCurrentUser();
          showAlert('Success', 'You have logged in successfully!');
          setEmail('');
          setPassword('');
          router.push(nextPath);
        } else {
          setLoading(false);
          showAlert('Error', 'There was an error logging in. Please try again.');
        }
      })
      .catch((error) => {
        if (error.message === 'Email does not exist') {
          setError('Email does not exist');
        } else {
          setError('Invalid email or password');
        }
        setLoading(false);
      });
  };

  const showAlert = (title, message) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 shadow-md">
          <h1 className="font-medium">{title}</h1>
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

          {error && <div className='text-red-600 text-sm font-medium'>{error}</div>}
        </form>
        <div className='text-text m-4 text-center'>New User? <Link href="/signup" className='text-primary font-bold'>Sign Up</Link></div>
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-auto ">
          <div className="loading loading-md text-black"></div>
        </div>
      )}
    </div>
  );
}

const LoginPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPageWrapper;
