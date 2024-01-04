
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartItem from './CartItem'
import { Link } from 'react-router-dom';

export default function CartList() {

  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    loadCart();
  }, [cartItems]);

  const setHeader = ()=> {
    const authheader = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    return authheader;
  };

  const loadCart = () => {
    Axios.get(`/cart/index`, setHeader()) //${user_id}
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

    Axios.delete(`/cart/courses/${course_id}`, setHeader())  //`/cart/${user_id}/courses/${course_id}`
      .then((response) => {
        console.log(response);
        loadCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div >
      <h1 className='text-center mt-4'>Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-center'>Your cart is empty!!</p>
      ) : (
        cartItems.map((course) => (
          
          <CartItem key={course._id} course={course} onRemoveItem={removeItem}  />
        ))        
      )}
<div className='text-center'>
      <Link to='/transactions/:cartId'  className='btn btn-secondary'>Proceed to Transactions</Link>
      </div>
    <br></br>
    </div>
  );
}