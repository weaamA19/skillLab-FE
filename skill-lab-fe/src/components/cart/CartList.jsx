
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartItem from './CartItem'
import cartData  from '../../db';

export default function CartList({ userId }) {

  const [cartItems, setCartItems] = useState(cartData);


  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    // Axios.get(`/cart/${userId}`)
    //   .then((response) => {
    //     console.log(response);
    //     setCartItems(response.data.cart.courses);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setCartItems(cartData)
  };

  const removeItem = (itemId) => {
    // Axios.delete(`/cart/${userId}/item/${itemId}`)
    //   .then((response) => {
    //     console.log(response);
    //     loadCart();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
      const updatedCart = cartItems.filter(course => course._id !== itemId);
      setCartItems(updatedCart);
  };

  console.log(cartItems);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!!</p>
      ) : (
        cartItems.map((course) => (
          <CartItem key={course._id} course={course} onRemoveItem={removeItem} />
        ))        
      )}
    </div>
  );
}