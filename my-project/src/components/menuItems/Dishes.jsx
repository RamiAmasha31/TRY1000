import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
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
        const dishesCollection = db.collection('menu_dishes');
        const snapshot = await dishesCollection.get();
        const dishesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDishes(dishesData);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-28 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-[#eba000]">Dishes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map(dish => (
          <div key={dish.id} className="bg-black rounded-md shadow-md p-4 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#00df988d]">
            <img src={dish.imgSrc} alt={dish.title} className="w-full h-96 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-center">{dish.title}</h3>
            <p className="text-gray-300 mb-2">{dish.description}</p>
            <p className="text-gray-400 font-bold text-center">${dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
