"use client"
import Image from 'next/image';
import Link from 'next/link'; // 1. IMPORT the correct Link component
import React from 'react';
import { Button } from '@/components/ui/button';
import { SignIn, SignInButton, useUser } from '@clerk/nextjs';

const menuOptions = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Pricing',
    path: '/pricing',
  },
  {
    name: 'Contact Us',
    path: '/contact-us', // Changed to a valid URL path
  },
];

const Header = () => {


  const {user} =useUser();
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
      {/* logo */}
      <div className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <h1 className='text-2xl font-bold'> AI Trip Planner</h1>
      </div>

      {/* menu options */}
      <div className='hidden items-center gap-6 md:flex'>
        {menuOptions.map((menu, index) => (
          // 2. USE the <Link> component with a unique key
          <Link href={menu.path} key={index}>
            <h2 className='cursor-pointer text-lg capitalize hover:scale-105 hover:text-primary'>
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* get started button */}
      <div>
        {!user?<SignInButton  mode='modal'>
        <Button>Get Started</Button>
        </SignInButton>:
        <Link  href={'/create-trip'}>
        <Button> Create New Trip</Button>
        </Link>}
      </div>
    </div>
  );
};

export default Header;