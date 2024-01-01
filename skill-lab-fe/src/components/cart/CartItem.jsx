import React from 'react';

export default function CartItem({ course, onRemoveItem }) {
  console.log(course);
  
  return (
    <div className="cart-item">
      {/* {course.courses.map((courseItem) => ( */}
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>Duration: {course.duration}</p>
          <p>Description: {course.description}</p>
          <p>Price: ${course.price}</p>
          <button onClick={() => onRemoveItem(course._id)}>Remove</button>
        </div>
      {/* ))} */}
    </div>
  );
}
