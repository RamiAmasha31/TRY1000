import React from 'react';
import LocationMap from './LocationMap';

const LocationSection = () => {
  const location = { lat: 48.8566, lng: 2.3522 }; // Example coordinates for San Francisco
 
  return (
    <section className="bg-black text-white py-24 px-4 flex flex-col items-center justify-center">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h2 className="text-5xl font-bold text-[#eba000] mb-4">Location</h2>
        {/* Display map */}
        <div className="mb-12 flex justify-center" style={{ height: '400px', width: '50%' }}>
          <LocationMap  className="rounded-xl " location={location} />
        </div>
        {/* Operating Hours */}
        <div className="mb-12">
          <h3 className="text-5xl font-bold text-[#eba000] mb-4">Operating Hours</h3>
          <p className="text-lg">Monday - Friday: 9:00 AM - 10:00 PM</p>
          <p className="text-lg">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
        </div>
        {/* Additional information */}
        <div className="mb-12">
          <h3 className="text-5xl font-bold text-[#eba000] mb-4">Parking Information</h3>
          <p className="text-lg">Free parking available in the rear</p>
        </div>
        {/* Directions */}
        <div>
          <h3 className="text-5xl font-bold text-[#eba000] mb-4">Address</h3>
          <p className="text-lg">Centre Commercial Créteil Soleil Avenue de la France libre, 94112 CRETEIL, France</p>
        </div>
      </div>
    </section>
  );
};




export default LocationSection;
