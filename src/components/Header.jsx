
"use client";
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const isActive = (path) => pathname === path;

    const confirmLogout = () => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 shadow-lg">
                    <h1 className="text-xl font-bold">Confirm Logout</h1>
                    <p className="text-md">Are you sure you want to log out?</p>
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                logout();
                                onClose();
                                setLoading(true);
                            }}
                            className="btn btn-sm rounded-md px-4 py-2 bg-red-600 text-white hover:bg-primary-dark"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onClose}
                            className="btn btn-sm rounded-md px-4 py-2 bg-gray-300  hover:bg-gray-400"
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    };


    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            showAlert('Success', 'Logout successful!');
            setLoading(false)
            router.push('/');
        } catch (error) {
            console.log(error.message);
            showAlert('Error', error.message);
            setLoading(false)
        }
    }

    const showAlert = (title, message) => {
        console.log('Alert title:', title); // Add this line for debugging
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className="w-80 p-4 flex flex-col gap-6 bg-white rounded-md border-2 absolute top-8 right-5">
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
        <header className="flex flex-col md:flex-row justify-between items-center p-4 max-w-[1200px] mx-auto">
            <div className="flex justify-between w-full md:w-auto items-center">
                <div className='my-1'>
                    <Link href="/" className="text-lg text-secondary font-bold sawarabi">
                        SweetShare
                    </Link>
                </div>

                <div
                    className="md:hidden btn btn-circle text-text text-xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>
            <nav className={`flex-col md:flex-row ${menuOpen ? 'flex' : 'hidden'} md:flex md:items-center md:space-x-4`}>
                <ul className="flex mx-auto flex-col text-text text-center md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
                    <li><Link href="/" className={`hover:underline ${isActive('/') ? 'text-black font-medium' : ''}`}>Home</Link></li>
                    <li><Link href="/recipes" className={`hover:underline ${isActive('/recipes') ? 'text-black font-medium ' : ''}`}>Recipes</Link></li>
                    <li><Link href="/upload" className={`hover:underline ${isActive('/upload') ? 'text-black font-medium' : ''}`}>Upload</Link></li>
                    <li><Link href="/profile" className={`hover:underline ${isActive('/profile') ? 'text-black font-medium ' : ''}`}>Profile</Link></li>
                </ul>
                <div className="flex flex-col gap-3 md:flex-row items-center">
                    {pathname === '/recipes' && (
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-sm input-bordered rounded-full mx-4 py-4 md:w-auto" />
                        </div>
                    )}
                    <Link href="/login" className="font-bold btn btn-sm text-primary p-2 rounded-md">Login</Link>
                    <button onClick={confirmLogout} className="font-bold btn btn-sm text-text p-2 rounded-md">Logout</button>
                </div>
            </nav>
            {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-auto ">
          <div className="loading loading-md text-black"></div>
        </div>
      }
        </header>
    );
}

