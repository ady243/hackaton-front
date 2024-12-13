"use client";
import React, { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaBuromobelexperte } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import { AiOutlineInsertRowLeft } from "react-icons/ai";
import { useAuth } from '@/context/AuthContext';

function Sidebar() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { user, token } = currentUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user, token]);

  const excludedPaths = ['/login', '/register', '/registerTeacher'];
  const defaultPath = '/calendar';

  useEffect(() => {
    if (!excludedPaths.includes(router.pathname) && router.pathname === '/') {
      router.push(defaultPath);
    }
  }, [router.pathname]);

  if (excludedPaths.includes(router.pathname)) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const styleText = {
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row' as const,
    backgroundColor: 'white'
  };

  const menuItems = [
    { href: '/calendar', icon: <FaBuromobelexperte />, label: 'Planing' },
    role === 'admin' && { href: '/admin', icon: <MdLaptopChromebook />, label: 'Mon espace admin' },
    role === 'admin' && { href: '/listOfSubject', icon: <MdLaptopChromebook />, label: 'Les matières des enseignants' }, 
    role === 'teacher' && { href: '/mainProf', icon: <MdLaptopChromebook />, label: 'Mon espace professeur' },
    { href: '/profesorDataTable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>, label: 'Les professeurs' },
    { href: '/subjectDataTable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>, label: 'Les matières' },
    { href: '/class', icon: <AiOutlineInsertRowLeft />, label: 'Les classes' },
    { href: '#', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37-2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>, label: 'Paramètres' },
  ].filter((item): item is { href: string; icon: JSX.Element; label: string } => Boolean(item));

  return (
    <div>
      <div className="fixed flex flex-col top-0 left-0 w-64 h-full border-r bg-white">
        <div className="flex items-center justify-center h-14 border-b">
          <div style={styleText}>
            <svg width="50" height="50" viewBox="0 0 1024 1024" className="icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier">
                <path d="M897.9 369.2H205c-33.8 0-61.4-27.6-61.4-61.4s27.6-61.4 61.4-61.4h692.9c33.8 0 61.4 27.6 61.4 61.4s-27.6 61.4-61.4 61.4z" fill="#379ed2"/>
                <path d="M807 171H703.3c-16.6 0-30 13.4-30 30s13.4 30 30 30H807c31.6 0 57.4 24 57.4 53.4v42.3H125.2v-42.3c0-29.5 25.7-53.4 57.4-53.4H293c16.6 0 30-13.4 30-30s-13.4-30-30-30H182.5c-64.7 0-117.4 50.9-117.4 113.4v527.7c0 62.5 52.7 113.4 117.4 113.4H807c64.7 0 117.4-50.9 117.4-113.4V284.5c0-62.6-52.7-113.5-117.4-113.5z m0 694.6H182.5c-31.6 0-57.4-24-57.4-53.4V386.8h739.2v425.4c0.1 29.5-25.7 53.4-57.3 53.4z" fill="#45484C"/>
                <path d="M447.6 217.1c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.4 98 63 98c20.6 0 39-13.4 50.4-36.7 7.3-14.9 1.1-32.9-13.8-40.2zM635.9 218.5c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.5 97.8 63.1 97.8c20.6 0 39-13.4 50.4-36.7 7.1-14.7 0.9-32.7-13.9-40z" fill="#45484C"/>
                <path d="M700.2 514.5H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h499.7c16.6 0 30-13.4 30-30s-13.5-30-30-30zM668.4 689.8h-74c-16.6 0-30 13.4-30 30s13.4 30 30 30h74c16.6 0 30-13.4 30-30s-13.4-30-30-30zM479.3 689.8H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h278.8c16.6 0 30-13.4 30-30s-13.4-30-30-30z" fill="#527dff"/>
              </g>
            </svg>
            <h2>Planify</h2>
          </div>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col py-4 space-y-1 flex-grow">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} legacyBehavior>
                  <a
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 pr-6 ${
                      router.pathname === item.href ? 'border-indigo-500 text-indigo-600 bg-indigo-100' : 'border-transparent'
                    }`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      {item.icon}
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <ul className="flex flex-col py-4 space-y-1">
              <li>
                <button
                  onClick={handleLogout}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Déconnexion</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;