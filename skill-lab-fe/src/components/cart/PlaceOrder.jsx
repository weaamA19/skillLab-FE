import React, { useState } from 'react';
import Axios from 'axios';
import ReactModal from 'react-modal';
import "./modalstyles.css";

export default function PlaceOrder() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  
  const setHeader = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  };

  const placeOrder = () => {
    Axios.get(`/cart/emptycart`, setHeader())
      .then((response) => {
        console.log(response);
        setModalIsOpen(true); // Open the modal on successful order placement
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close the modal
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card">
        <div className="card-body">
          <p>By clicking on the 'Place Order', you will be successfully enrolled in the course.</p>
          <button onClick={placeOrder} className="btn btn-primary">Place Order</button>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="custom-modal"
            overlayClassName="custom-overlay"
            contentLabel="Modal"
          >
            <div className="card">
              <div className="card-body">
                <h2>You've been enrolled in the course(s)!!</h2>
                <button onClick={closeModal} className="btn btn-primary">Close</button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    </div>
  );
}