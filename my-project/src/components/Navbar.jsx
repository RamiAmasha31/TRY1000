import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection'; // Import the AboutUsSection component
import LocationSection from './LocationSection';
import ReservationsForm from './ReservationsForm';
import PrivateEventsForm from './PrivateEventsForm';
const NavBar = ({ onNavItemClick }) => {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null); // State to manage dropdown visibility
  const [hoveredItem, setHoveredItem] = useState(null); // State to manage the currently hovered item

  const handleNav = () => {
    setNav(!nav); // Toggle mobile menu visibility
  };

  const handleNavItemClick = (item) => {
    if (item.dropdownItems) {
      // Show dropdown if the clicked item has dropdown items
      setShowDropdown(showDropdown === item.id ? null : item.id);
    } else {
      // Close mobile menu if the clicked item doesn't have dropdown items
      setNav(false);
      setShowDropdown(null);
      onNavItemClick(item.section);
    }
  };

  const handleDropdownItemClick = (dropdownItem) => {
    // Close mobile menu and trigger action for the clicked dropdown item
    setNav(false);
    setShowDropdown(null);
    onNavItemClick(dropdownItem);
  };

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const navItems = [
    { id: 1, text: 'Home', section: <HeroSection /> },
    { id: 2, text: 'Menu', dropdownItems: ['Dishes', 'Drinks', 'Desserts', 'Alcohol'] },
    { id: 3, text: 'About Us', section: <AboutUsSection /> },
    { id: 4, text: 'Location & Hours', section: <LocationSection /> },
    { id: 5, text: 'Reservations', section: <ReservationsForm /> },
    { id: 6, text: 'Private Events', section: <PrivateEventsForm /> },
  ];
  
  return (
    <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white relative'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Flavor Voyage.</h1>
      <ul className='hidden md:flex w-auto'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-2  hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black relative'
            onClick={() => handleNavItemClick(item)}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            {item.text}
            {item.dropdownItems && hoveredItem === item.id && (
              <ul className='absolute -left-2 mt-5 bg-black text-white p-2 rounded-md'>
                {item.dropdownItems.map((dropdownItem, index) => (
                  <li
                    key={index}
                    className='cursor-pointer hover:bg-[#00df9a] hover:text-black py-2  rounded-xl'
                    onClick={() => handleDropdownItemClick(dropdownItem)}
                  >
                    {dropdownItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div onClick={handleNav} className='block md:hidden z-50'>
        {nav ? <AiOutlineClose size={40} className='z-11' /> : <AiOutlineMenu size={40} className='z-11' />}
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden text-center left-0 top-0 w-full h-full bg-[#000300] ease-in-out duration-500 z-10'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-10'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Flavor Voyage.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 relative 	'
            onClick={() => handleNavItemClick(item)} // Toggle dropdown on click
          >
            {item.text}
            {/* Show dropdown items as navbar items */}
            {item.dropdownItems && showDropdown === item.id && (
              <div className="bg-[#00df9a]">
                {item.dropdownItems.map((dropdownItem, index) => (
                  <div
                    key={index}
                    className='cursor-pointer hover:bg-[#00df9a] hover:text-black py-1 px-2'
                    onClick={() => handleDropdownItemClick(dropdownItem)}
                  >
                    {dropdownItem}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;