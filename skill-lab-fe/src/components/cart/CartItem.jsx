import React from 'react';

export default function CartItem({ course, onRemoveItem }) {
  console.log(course);
  
  return (
    <div className="cart-item">
      {course.courses.map((courseItem) => (
        <div key={courseItem._id}>
          <h3>{courseItem.title}</h3>
          <p>Duration: {courseItem.duration}</p>
          <p>Description: {courseItem.description}</p>
          <p>Price: ${courseItem.price}</p>
          <button onClick={() => onRemoveItem(courseItem._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
