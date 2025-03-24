import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, History, LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility on mobile
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to handle logout and close the menu
  const handleLogout = () => {
    logout();
    closeMenu(); // Close the menu when logged out
    navigate('/'); // Redirect to home page after logout
  };

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

          {/* Hamburger Menu Icon for Mobile */}
          <div className='lg:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className='text-primary' />
            </button>
          </div>

          {/* Desktop and Tablet Navbar */}
          <div className='hidden lg:flex items-center gap-4'>
            {authUser && (
              <>
                <div className='lg:text-sm text-xs text-white font-bold'>
                  <span className='hidden sm:inline'>Patient ID: </span> {authUser.patientId}
                </div>

                <Link to={"/"}>
                  <div className="size-5 lg:size-8 flex items-center justify-center rounded-full border border-blue bg-gray-800 text-white font-bold test-sm ld:text-lg">
                    {authUser.fullName ? authUser.fullName.charAt(0).toUpperCase() : <User className="size-4" />}
                  </div>
                </Link>

                <Link to={"/user-history"} className='btn btn-sm gap-2'>
                  <History className='size-4 lg:size-5' />
                  <span className='hidden sm:inline'>History</span>
                </Link>

                <button className='flex gap-2 items-center' onClick={handleLogout}>
                  <LogOut className='size-4 lg:size-5' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible only when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className='lg:hidden flex flex-col items-center gap-4 mt-4 bg-base-100/90 p-4'>
          {authUser && (
            <div className="flex items-center gap-4 mb-4">
              {/* Patient ID on mobile */}
              <div className='text-xs text-white font-bold'>
                <span className='sm:inline'>Patient ID: </span> {authUser.patientId}
              </div>
              {/* User Icon on mobile (using first letter) */}
              {/* <div className="size-5 lg:size-8 flex items-center justify-center rounded-full border border-blue bg-gray-800 text-white font-bold">
                {authUser.fullName ? authUser.fullName.charAt(0).toUpperCase() : <User className="size-4" />}
              </div> */}
            </div>
          )}

          {/* Mobile Menu Items (History and Logout) */}
          <Link 
            to={"/user-history"} 
            className='btn btn-sm gap-2 flex items-center justify-between' 
            onClick={closeMenu}  // Close menu after clicking
          >
            <History className='size-4 lg:size-5' />
            <span>History</span>
          </Link>

          <button 
            className='flex gap-2 items-center justify-between' 
            onClick={handleLogout} // Close menu and logout
          >
            <LogOut className='size-4 lg:size-5' />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
