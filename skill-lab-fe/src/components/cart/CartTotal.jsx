import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function CartTotal() {
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardID, setCardID] = useState('');
  // const [finishedOrder, setFinishedOrder] = useState(false)

  useEffect(() => {
    loadCourses();
  }, [courses]);
  
  useEffect(() => {
    fetchTotalAmount();
  }, [cardID, totalAmount]);

  const setHeader = () => {
    return {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    };
  };

  const loadCourses = () => {
    Axios.get('/cart/index', setHeader())
      .then((response) => {
        console.log(response);
        setCardID(response.data.cart._id)
        setCourses(response.data.cart.courses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }

  const fetchTotalAmount = () => {
    if (cardID != "") {
        Axios.get(`/transactions/${cardID}`, setHeader())
      .then((response) => {
        setTotalAmount(response.data.updatedTransaction.amount); // Assuming the amount is returned as totalPrice
      })
      .catch((error) => {
        console.error('Error fetching total amount:', error);
      });
    }

  }

  // const placeOrder =  () => {
  //   Axios.get(`/cart/emptycart`, setHeader())
  //     .then((response) => {
  //       console.log(response);
  //       setFinishedOrder(true);
  //       setTimeout(()=>{
  //         setFinishedOrder(false)
  //       }, 1500)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching courses:', error);
  //     });
  // }
  
  return (
    <div>
      <h1>Transaction</h1>
      {courses.length === 0 ? (
        <p>Your cart is empty!!</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.title} - ${course.price}
            </li>
          ))}
        </ul>
      )}
      <h4>Total Amount: ${totalAmount}</h4>

      {/* <button onClick={placeOrder}>Place Order</button> */}
      {/* {finishedOrder && (<p>You've been enrolled in the course(s)!!</p>)} */}
      
      <Link to="/place-order">Proceed to Check Out</Link>

    </div>
  );
};
