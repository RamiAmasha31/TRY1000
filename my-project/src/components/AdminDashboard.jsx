import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import CustomAlertModal from './CustomAlertModal'; // Import the custom alert modal
import ReservationFormFields from './ReservationFormFields';

const AdminDashboard = ({ username }) => {
  const [menuItem, setMenuItem] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('dishes'); // Default item type
  const [imgSrc, setImgSrc] = useState('');
  const [reservations, setReservations] = useState([]);
  const [privateEventReservations, setPrivateEventReservations] = useState([]); // Define private event reservations state
  const [alertMessage, setAlertMessage] = useState('');
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [showPrivateEventReservations, setShowPrivateEventReservations] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const db = firebase.firestore();
        const reservationsCollection = db.collection('reservations');
        const snapshot = await reservationsCollection.get();
        const reservationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    const fetchPrivateEventReservations = async () => {
      try {
        const db = firebase.firestore();                          
        const privateEventReservationsCollection = db.collection('privateEventsReservations'); // Adjust collection name according to your database
        const snapshot = await privateEventReservationsCollection.get();
        const privateEventReservationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPrivateEventReservations(privateEventReservationsData);
        console.log(privateEventReservationsData);
      } catch (error) {
        console.error('Error fetching private event reservations:', error);
      }
    };

    fetchReservations();
    fetchPrivateEventReservations();
  }, []);

  const handleAddMenuItem = async (e) => {
    e.preventDefault();

    try {
      const db = firebase.firestore();
      // Add the menu item to the appropriate collection based on the item type
      await db.collection(`menu_${itemType}`).add({
        title: menuItem,
        description: itemDescription,
        imgSrc: imgSrc,
        price: itemPrice,
      });
      // Clear form inputs after submission
      setMenuItem('');
      setItemDescription('');
      setItemPrice('');
      setImgSrc('');
      // Show success alert
      setAlertMessage('Menu item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleShowAddMenuItem = () => {
    setShowAddMenuItem(true);
    setShowReservations(false);
    setShowPrivateEventReservations(false);
  };

  const handleShowReservations = async () => {
    setShowAddMenuItem(false);
    setShowReservations(true);
    setShowPrivateEventReservations(false);
  };

  const handleShowPrivateEventReservations = async () => {
    setShowAddMenuItem(false);
    setShowReservations(false);
    setShowPrivateEventReservations(true);
  };

  return (
    <div className='bg-black w-full h-screen text-[#eba000] flex flex-col justify-center items-center'>
      <p className="text-xl font-bold mb-4">Hello, {username}</p>
      <div className="flex gap-4 mb-4">
        <button onClick={handleShowAddMenuItem} className="px-4 py-2 bg-[#eba000] text-white rounded-md hover:bg-[#eba100a5] focus:outline-none focus:bg-blue-600">Add Menu Item</button>
        <button onClick={handleShowReservations} className="px-4 py-2 bg-[#eba000] text-white rounded-md hover:bg-[#eba100a5] focus:outline-none focus:bg-blue-600">Show Reservations</button>
        <button onClick={handleShowPrivateEventReservations} className="px-4 py-2 bg-[#eba000] text-white rounded-md hover:bg-[#eba100a5] focus:outline-none focus:bg-blue-600">Show Private Event Reservations</button>
      </div>

      {showAddMenuItem && (
        <>
          <p className="text-lg mb-4">For adding a new menu item, please fill the following fields:</p>
          <form onSubmit={handleAddMenuItem} className="flex flex-col gap-4">
            <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none text-black">
              <option value="dishes">Dishes</option>
              <option value="drinks">Drinks</option>
              <option value="alcohol">Alcohol</option>
            </select>
            <input type="text" placeholder="Title" value={menuItem} onChange={(e) => setMenuItem(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none text-black" />
            <input type="text" placeholder="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none text-black" />
            <input type="text" placeholder="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none text-black" />
            <input type="text" placeholder="Image Source" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} className="px-3 py-2 border rounded-md focus:outline-none text-black" />
            <button type="submit" className="px-4 py-2 bg-[#eba000] text-white rounded-md hover:bg-[#eba100a5] focus:outline-none focus:bg-[#eba1006f]">Add Item</button>
          </form>
        </>
      )}

{showReservations && (
  <div className="mt-8 px-4"> {/* Added px-4 for horizontal padding */}
    <h2 className="text-xl font-bold mb-4">Reservations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {reservations.map((reservation, index) => {
        // Convert timestamp to a Date object
        const reservationDate = new Date(reservation.timestamp.toDate());
        // Extract date components
        const year = reservationDate.getFullYear();
        const month = reservationDate.getMonth() + 1; // Months are zero-based, so we add 1
        const day = reservationDate.getDate();
        // Extract time components
        const hours = reservationDate.getHours();
        const minutes = reservationDate.getMinutes();
        // Format date and time
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return (
          <div key={index} className="border p-4 rounded-md">
            <div className="max-w-md mx-auto"> {/* Added max width and centering */}
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Email:</strong> {reservation.email}</p>
              <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
              <p><strong>Number of guests:</strong> {reservation.numberOfPeople}</p>
              <p><strong>Date:</strong> {formattedDate}</p>
              <p><strong>Time:</strong> {formattedTime}</p>
              {/* Add more reservation details as needed */}
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
{showPrivateEventReservations && (
  <div className="mt-8 px-4"> {/* Added px-4 for horizontal padding */}
    <h2 className="text-xl font-bold mb-4">Private Event Reservations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {privateEventReservations.map((reservation, index) => {
        // Convert timestamp to a Date object
        const reservationDate = new Date(reservation.timestamp.toDate());
        // Extract date components
        const year = reservationDate.getFullYear();
        const month = reservationDate.getMonth() + 1; // Months are zero-based, so we add 1
        const day = reservationDate.getDate();
        // Extract time components
        const hours = reservationDate.getHours();
        const minutes = reservationDate.getMinutes();
        // Format date and time
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return (
          <div key={index} className="border p-4 rounded-md">
            <div className="max-w-md mx-auto"> {/* Added max width and centering */}
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Email:</strong> {reservation.email}</p>
              <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
              <p><strong>Date:</strong> {formattedDate}</p>
              <p><strong>Time:</strong> {formattedTime}</p>
              {/* Add more reservation details as needed */}
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
      {alertMessage && <CustomAlertModal message={alertMessage} onClose={() => setAlertMessage('')} />}

      <div>
        {/* Your buttons for other functionalities here */}
      </div>
    </div>
  );
};

export default AdminDashboard;

