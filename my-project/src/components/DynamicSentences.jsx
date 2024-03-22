import React, { useState, useEffect } from 'react';

const DynamicSentences = ({ sentences }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % sentences.length);
    }, 2500); // Change sentence every 5 seconds

    return () => clearInterval(interval);
  }, [sentences]);

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
      <p
        className="opacity-0 transition-opacity duration-1000 absolute top-0 left-0 right-0 mx-auto text-center opacity-100"
        style={{ marginTop: `${currentIndex * 20}px` }}
      >
        {sentences[currentIndex]}
      </p>
    </div>
  );
};

export default DynamicSentences;
