import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const ReservationsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const firebaseConfig = {
        apiKey: "AIzaSyCCi75-RJeDgMS17C1qE1StBPyUL85QztA",
        authDomain: "resturant-94f15.firebaseapp.com",
        projectId: "resturant-94f15",
        storageBucket: "resturant-94f15.appspot.com",
        messagingSenderId: "59447957183",
        appId: "1:59447957183:web:a14ae5107e9ec34479980a",
        measurementId: "G-KC29EGQM0Q"
      };
      
      firebase.initializeApp(firebaseConfig);
      
      const db = firebase.firestore();

      // Access Firestore collection named 'reservations'
      const reservationsCollection = db.collection('reservations');

      // Check if the form data already exists in the Firestore collection
      const checkSnapshot = await reservationsCollection.where('email', '==', formData.email).get();
      if (!checkSnapshot.empty) {
        alert('Sorry! This email has already been used for a reservation.');
      } else {
        // Add the form data to the Firestore collection
        await reservationsCollection.add({
          ...formData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Your reservation has been confirmed!');

        // Reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          // Reset other fields as needed
        });
      }
    } catch (error) {
      console.error('Error handling Firestore:', error);
      alert('An error occurred while processing your reservation. Please try again later.');
    }
  };

  return (
    <div className="container w-full bg-black h-screen text-white flex flex-col justify-center items-center">
      <h2 className="mb-4 text-2xl font-bold">Reservations</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-sm font-semibold">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default ReservationsForm;
