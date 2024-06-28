"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const isActive = (path) => pathname === path;

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
                    <li><Link href="/categories" className={`hover:underline ${isActive('/categories') ? 'text-black font-medium ' : ''}`}>Recipes</Link></li>
                    <li><Link href="/upload" className={`hover:underline ${isActive('/upload') ? 'text-black font-medium' : ''}`}>Upload</Link></li>
                    <li><Link href="/profile" className={`hover:underline ${isActive('/profile') ? 'text-black font-medium ' : ''}`}>Profile</Link></li>
                </ul>
                <div className="flex flex-col gap-3 md:flex-row items-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-sm input-bordered rounded-full mx-4 py-4 md:w-auto" />
                    </div>
                    <Link href="/login" className="font-bold btn btn-sm text-primary p-2 rounded-md">Login</Link>
                </div>
            </nav>
        </header>
    );
}
