'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoPersonCircle } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import Auth from '../auth/page';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

const Navbar = ({ location }) => {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const closeAuth = () => {
    setShowAuth(false);
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center h-14 relative">
      <Link className="text-white font-bold text-xl cursor-pointer" href='/'>
        BIT Connect
      </Link>
      <div className="flex items-center space-x-6">
        <span className={`text-white hover:text-gray-300 cursor-pointer flex items-center ${location === 'community' ? 'font-bold' : ''}`} onClick={() => router.push('/community')}>
          <FaPeopleGroup className=' text-3xl mr-1' />
          <div>Community</div>
        </span>
        <span className={`text-white hover:text-gray-300 cursor-pointer flex items-center ${location === 'doubt' ? 'font-bold' : ''}`} onClick={() => router.push('/doubt')}>
          <GiBrain className='text-3xl mr-1' />
          <div>Doubts</div>
        </span>
        {user ? (
          <div className="relative">
            <span
              className={`text-white hover:text-gray-300 cursor-pointer flex items-center ${location === 'profile' ? 'font-bold' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <IoPersonCircle className='text-3xl mr-1' />
              <div>Profile</div>
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <span
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                  onClick={() => router.push('/profile')}
                >
                  Profile
                </span>
                <span
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                  onClick={logout()}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <span className={`text-white hover:text-gray-300 cursor-pointer flex items-center ${location === 'profile' ? 'font-bold' : ''}`} onClick={() => setShowAuth(true)}>
            <IoPersonCircle className='text-3xl mr-1' />
            <div>Login/Signup</div>
          </span>
        )}
      </div>
      {showAuth && (
        <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-50 pt-20 w-screen h-screen">
          <Auth closeAuth={closeAuth} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
