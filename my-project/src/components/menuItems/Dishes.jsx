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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map(dish => (
        <div key={dish.id} className="bg-white rounded-md shadow-md p-4">
          <img src={dish.imgSrc} alt={dish.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold mb-2">{dish.title}</h3>
          <p className="text-gray-600 mb-2">{dish.description}</p>
          <p className="text-gray-700 font-bold">${dish.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Dishes;
