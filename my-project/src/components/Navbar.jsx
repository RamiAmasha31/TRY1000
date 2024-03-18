import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [hoveredItem, setHoveredItem] = useState(null); // State to manage the currently hovered item

  const handleNav = () => {
    if (nav) {
      // If the menu is open, close it and reset dropdown
      setNav(false);
      setShowDropdown(false);
    } else {
      // If the menu is closed, open it
      setNav(true);
    }
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Menu', dropdownItems: ['Dishes', 'Drinks', 'Desserts', 'Alcohol'] }, // Add dropdown items
    { id: 3, text: 'About Us' },
    { id: 4, text: 'Gallery' },
    { id: 5, text: 'Reservations' },
    { id: 6, text: 'Private Events' },
  ];

  return (
    <div className='  bg-black flex justify-between items-center h-24  mx-auto px-4 text-white relative'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Flavor Voyage.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex w-auto'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black relative'
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.text}
            {/* Dropdown content */}
            {hoveredItem === item.id && item.dropdownItems && (
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

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={40} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden text-center left-0 top-0 w-[100%] h-full border-r  border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-0'
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
            onClick={() => setShowDropdown(item.id)} // Toggle dropdown on click
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