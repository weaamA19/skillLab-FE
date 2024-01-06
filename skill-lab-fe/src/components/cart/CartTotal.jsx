import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function CartTotal() {
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardID, setCardID] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    fetchTotalAmount();
  }, [cardID]);

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
        setCardID(response.data.cart._id);
        setCourses(response.data.cart.courses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }

  const fetchTotalAmount = () => {
    if (cardID !== "") {
      Axios.get(`/transactions/${cardID}`, setHeader())
        .then((response) => {
          setTotalAmount(response.data.updatedTransaction.amount); // Assuming the amount is returned as totalPrice
        })
        .catch((error) => {
          console.error('Error fetching total amount:', error);
        });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Transaction</h1>
        {courses.length === 0 ? (
          <p>Your cart is empty!!</p>
        ) : (
          <ul className="list-group list-group-flush">
            {courses.map((course) => (
              <li key={course.id} className="list-group-item">
                {course.title} - ${course.price}
              </li>
            ))}
          </ul>
        )}
        <h4 className="mt-3">Total Amount: ${totalAmount}</h4>
        <Link to="/place-order" className="btn btn-primary mt-3">Proceed to CheckOut</Link>
      </div>
    </div>
  );
};
