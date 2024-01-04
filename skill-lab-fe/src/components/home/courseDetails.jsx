import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';


export default function CourseDetails() {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      loadCourseDetails();
    }, []);

    const loadCourseDetails = () => {
        Axios.get(`/courses/detail/${id}`)
        .then((response) => {
            console.log(response);
            setCourses(response.data.courses);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
      };

  return (
   <div className="container">
  <div className="card mx-auto text-center col-md-7">
    <div className="card-body ">
      <h2>{courses.title}</h2>
    </div>
    <div className="card-body">
      <h4>{courses.duration}</h4>
      <h4>{courses.description}</h4>
      <h4>{courses.price}</h4>
      <button className="btn btn-secondary">Enroll Now</button>
    </div>
  </div>
</div>
  )
}
