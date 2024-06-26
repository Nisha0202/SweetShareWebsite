"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('User logged in:', { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
      <div className="border-2 m-4 p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2  rounded placeholder-transparent focus:ring-0"
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
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary font-bold py-2 px-4 rounded transition-all duration-300 hover:bg-accent"
          >
            Login
          </button>
        </form>
        <div className='text-text m-4 text-center'>New User? <Link href={"/signup"} className='text-primary font-bold'>Sign Up</Link></div>
      </div>
    </div>
  );
}
