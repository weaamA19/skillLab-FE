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
    <div>
        <div>
              <h1>{courses.title}</h1>  
            <button>Enroll Now</button> 
        </div>
          
          <div>
              <h3>{courses.duration}</h3>  
              <h3>{courses.description}</h3>  
              <h3>{courses.price}</h3>  
        </div>
    </div>
  )
}
