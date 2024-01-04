
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartItem from './CartItem'
import { Link } from 'react-router-dom';
export default function CartList() {

  const [cartItems, setCartItems] = useState([]);
  const [finishedOrder, setFinishedOrder] = useState(false)


  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    Axios.get(`cart/index?id=65951de759c85b96d95cfd1f`) //${user_id}
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

    Axios.delete(`/cart/65951de759c85b96d95cfd1f/courses/${course_id}`)  //`/cart/${user_id}/courses/${course_id}`
      .then((response) => {
        console.log(response);
        loadCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(cartItems);


const placeOrder = () => {
  setFinishedOrder(true)
  setCartItems([])

  setTimeout(()=>{
    setFinishedOrder(false)

  }, 1500)
 
}


  return (
    <div >
      <h1 className='text-center mt-4'>Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-center'>Your cart is empty!!</p>
      ) : (
        cartItems.map((course) => (
          
          <CartItem key={course._id} course={course} onRemoveItem={removeItem} placingOrder={placeOrder}  />
        ))        
      )}
      {finishedOrder && (<p>You've been enrolled!!</p>)}
   <div className='text-center'>
      <Link to="/cart/transaction" className='btn btn-secondary'>Proceed To Payment</Link>
    </div>
    <br></br>
    </div>
  );
}