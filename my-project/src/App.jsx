import React, { useState } from 'react';
import NavbarWithMegaMenu from "./components/Navbar";
import HeroSection from './components/HeroSection';

export default function App() {
  const [activeSection, setActiveSection] = useState(<HeroSection/>);

  const handleNavItemClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <NavbarWithMegaMenu onNavItemClick={handleNavItemClick} />
      {activeSection}
    </div>
  );
}