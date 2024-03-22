import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % 4);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const content = [
    {
      title: "Welcome to Flavor Voyage",
      description: "Experience a culinary journey like no other."
    }
  ];

  return (
    <div className='bg-black flex flex-col md:flex-row justify-center items-center h-screen w-full'>
      {/* Text content */}
      <div className='text-center text-white md:w-1/2 p-8'>
        {content.map((item, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-4xl font-bold mb-4 overflow-hidden text-[#eba000] ">
              {item.title.split('').map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="animate-text-reveal inline-block"
                  style={{ animationDelay: `${0.01 * index}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <p className="text-lg leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      {/* Gallery */}
      <div className="flex justify-center items-center w-screen h-screen md:w-1/2">
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            key={index}
            src={`./src/images/image${index + 1}.jpg`}
            alt={`Image ${index + 1}`}
            className={`w-full h-full rounded-2xl object-cover transition-opacity pr-2 pl-2 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{ display: index === currentImage ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
