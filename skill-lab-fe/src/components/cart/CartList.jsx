
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartItem from './CartItem'

export default function CartList() {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    Axios.get(`cart/index?id=6591474b6524e144737adbcc`) //${user_id}
      .then((response) => {
        console.log(response);
        setCartItems(response.data.cart.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItem = (course_id) => { //user_id

    Axios.delete(`/cart/6591474b6524e144737adbcc/courses/${course_id}`)  //`/cart/${user_id}/courses/${course_id}`
      .then((response) => {
        console.log(response);
        loadCart();
      })
      .catch((err) => {
        console.log(err);
      });
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