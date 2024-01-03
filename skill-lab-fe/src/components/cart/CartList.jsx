
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartItem from './CartItem'
import { Link } from 'react-router-dom';
export default function CartList() {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    Axios.get(`cart/index?id=65941f91c4d719411671a037`) //${user_id}
      .then((response) => {
        console.log("load cart",response);
        // set cartId
        setCartItems(response.data.cart.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItem = (course_id) => { //user_id

    Axios.delete(`/cart/65941f91c4d719411671a037/courses/${course_id}`)  //`/cart/${user_id}/courses/${course_id}`
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
      <Link to="/cart/transaction">Proceed To Payment</Link>
    </div>
  );
}