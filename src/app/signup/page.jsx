"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('User signed up:', { username, email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-160px)] ">
      <div className=" p-8 rounded-md border-2 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
              className="w-full px-3 py-2 rounded placeholder-transparent "
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
        </form>
        <div className='text-text m-4 text-center'>Already User? <Link href={"/login"} className='text-primary font-bold'>Log In</Link>  </div>
      </div>
    </div>
  );
}
