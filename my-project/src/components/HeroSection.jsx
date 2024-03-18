import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % 4);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-black flex flex-col justify-center items-center h-screen'>
      {/* Content of the hero section */}
      <div className='text-center text-white'>
        <h1 className='text-5xl font-bold text-[#00df9a] mb-4' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Welcome to Flavor Voyage</h1>
        <p className='text-lg mb-8' style={{ fontFamily: 'Arial, sans-serif' }}>Experience a culinary journey like no other.</p>
        {/* You can add more content here, like buttons or images */}
      </div>
      <div className="grid grid-cols-1  gap-4 max-w-md">
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            key={index}
            src={`./src/images/image${index + 1}.jpg`}
            alt={`Image ${index + 1}`}
            className={`w-full h-96 rounded-2xl transition-opacity pr-2 pl-2 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{ display: index === currentImage ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
