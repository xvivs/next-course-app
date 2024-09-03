'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div>
      <nav className='flex justify-between navbar p-5 bg-slate-200'>
        <div className='flex space-x-5'>
          <Link className='btn' href="/">Home</Link>
          <Link className="btn" href="/users">Users</Link>
          <Link className="btn" href="/upload">Upload Page</Link>
        </div>
        <div className='flex space-x-5'>
          { status === 'loading' && <div>Loading...</div> }
          { status === 'authenticated' && 
            <div>
              <span>{session.user!.name}</span>
              <Link className='ml-4 mr-4 btn' href='/api/auth/signout'>Sign out</Link>
              <Link className='btn' href="/auth/change-password">Change Password</Link>
            </div> 
          }
          { status === 'unauthenticated' && 
            <div className='flex space-x-5'>
              <Link className="btn" href="/auth/signup">Sign Up</Link>
              <Link className="btn" href="/api/auth/signin">Sign In</Link>
            </div> 
          }
        </div>
      </nav>
    </div>
  )
}

export default NavBar;