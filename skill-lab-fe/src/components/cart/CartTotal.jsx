import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function CartTotal() {
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardID, setCardID] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const setHeader = () => {
    return {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    };
  };

  const loadData = async () => {
    try {
      const cartResponse = await Axios.get('/cart/index', setHeader());
      const cardId = cartResponse.data.cart._id;
      const coursesData = cartResponse.data.cart.courses;

      setCardID(cardId);
      setCourses(coursesData);

      const totalAmountResponse = await Axios.get(`/transactions/${cardId}`, setHeader());
      const updatedTotalAmount = totalAmountResponse.data.updatedTransaction.amount;

      setTotalAmount(updatedTotalAmount);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Transaction</h1>
        {isLoading ? (
          <p>Calculating the total amount...</p>
        ) : (
          <>
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
            <Link to="/place-order" className="btn btn-primary mt-3">
              Proceed to CheckOut
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
