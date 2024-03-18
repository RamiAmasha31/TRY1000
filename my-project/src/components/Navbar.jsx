import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import HeroSection from './HeroSection';

const NavBar = ({ onNavItemClick }) => {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null); // State to manage dropdown visibility

  const handleNav = () => {
    setNav(!nav); // Toggle mobile menu visibility
  };

  const handleNavItemClick = (item) => {
    if (item.dropdownItems) {
      // Show dropdown if the clicked item has dropdown items
      setShowDropdown(item.id);
    } else {
      // Close mobile menu if the clicked item doesn't have dropdown items
      setNav(false);
      setShowDropdown(null);
      onNavItemClick(item.section);
    }
  };

  const navItems = [
    { id: 1, text: 'Home', section: <HeroSection /> },
    { id: 2, text: 'Menu', dropdownItems: ['Dishes', 'Drinks', 'Desserts', 'Alcohol'] },
    { id: 3, text: 'About Us' },
    { id: 4, text: 'Gallery' },
    { id: 5, text: 'Reservations' },
    { id: 6, text: 'Private Events' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white relative'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Flavor Voyage.</h1>
      <ul className='hidden md:flex w-auto'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black relative'
            onClick={() => handleNavItemClick(item)}
          >
            {item.text}
            {item.dropdownItems && showDropdown === item.id && (
              <ul className='absolute left-0 mt-2 bg-black text-white p-2 rounded-md'>
                {item.dropdownItems.map((dropdownItem, index) => (
                  <li key={index} className='cursor-pointer hover:bg-[#00df9a] hover:text-black py-1 px-2'>
                    {dropdownItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={40} />}
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden text-center left-0 top-0 w-full h-full bg-[#000300] ease-in-out duration-500 z-0'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Flavor Voyage.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 relative'
            onClick={() => handleNavItemClick(item)} // Toggle dropdown on click
          >
            {item.text}
            {/* Show dropdown items as navbar items */}
            {item.dropdownItems && showDropdown === item.id && (
              <>
                {item.dropdownItems.map((dropdownItem, index) => (
                  <li key={index} className='cursor-pointer hover:bg-[#00df9a] hover:text-black py-1 px-2'>
                    {dropdownItem}
                  </li>
                ))}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
