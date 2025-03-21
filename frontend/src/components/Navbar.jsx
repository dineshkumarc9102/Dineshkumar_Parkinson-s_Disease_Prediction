import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { Brain, History, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className='size-5 lg:size-8 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Brain className='lg:size-8 text-primary' />
              </div>
              <h1 className='lg:text-lg text-xs font-bold'>Parkinson's Disease Prediction</h1>
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            {authUser && (
              <>
                {/* User Icon with First Letter */}
                <Link to={"/"}>
                  <div className="size-5 lg:size-8 flex items-center justify-center rounded-full border border-blue bg-gray-800 text-white font-bold test-sm ld:text-lg">
                    {authUser.fullName ? authUser.fullName.charAt(0).toUpperCase() : <User className="size-4" />}
                  </div>
                </Link>

                <Link to={"/user-history"} className='btn btn-sm gap-2'>
                  <History className='size-4 lg:size-5' />
                  <span className='hidden sm:inline'>History</span>
                </Link>

                <button className='flex gap-2 items-center' onClick={logout}>
                  <LogOut className='size-4 lg:size-5' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
