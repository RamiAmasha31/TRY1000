import React from 'react';
import GoogleMapReact from 'google-map-react';

const LocationMap = ({ location, className }) => {
  return (
    <div className={`rounded-xl ${className}`} style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBYZsqlV_22CHOZpljGTKa6UZUxnsPo3j0' }} // Replace 'YOUR_API_KEY' with your actual Google Maps API key
        defaultCenter={location}
        defaultZoom={15}
        draggable={false} // Disable map dragging
        zoomControl={false} // Disable zoom control
        scrollwheel={false} // Disable scrollwheel zoom
      >
        {/* Marker */}
        <Marker
          lat={location.lat}
          lng={location.lng}
          text="Flavor Voyage"
        />
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ text }) => <div className="marker">{text}</div>;

export default LocationMap;
