import React from 'react';

export default function CartItem({ course, onRemoveItem, placingOrder }) {


  console.log(course);
  
  return (
    <>
<div className='container text-center'>
  <div className='row justify-content-center'>
  <div className="col-md-6  mx-auto">
  <div className="card mb-4">

    <div className="card-body cart-item text-center">
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>Duration: {course.duration}</p>
          <p>Description: {course.description}</p>
          <p>Price: ${course.price}</p>
          <div className='d-flex gap-2 align-items-center justify-content-center'>
          <button className='btn btn-secondary' onClick={() => onRemoveItem(course._id)}>Remove</button>
          <button className='btn btn-secondary' onClick={() => placingOrder(course._id)}>Place Order</button>
        </div>
        </div>
   
    </div>

   </div>
        </div>
           </div>
            </div>
    </>
  );
}
