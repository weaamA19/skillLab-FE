import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import "./modalstyles.css";

export default function CourseDetails(props) {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setHeader = () => {
    const authheader = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    };
    return authheader;
  };

  useEffect(() => {
    loadCourseDetails();
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      setIsEnrolled(enrolledCourses.some((enrolledCourse) => enrolledCourse._id === id));
      setIsLoading(false);
    }
  }, [enrolledCourses]);

  const loadCourseDetails = () => {
    Axios.get(`/courses/detail/${id}`)
      .then((response) => {
        console.log(response);
        setCourse(response.data.courses);
      })
      .catch((error) => {
        console.error('Error fetching course details', error);
      });
  };

  const addCourseToCart = () => {
    Axios.put(`/cart/update`, { courses: course._id }, setHeader())
      .then((response) => {
        console.log(response);
        let message = response.data.message;
        console.log('received message', message);
        setModalMessage(message);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error adding course ', error);
      });
  };

  const fetchEnrolledCourses = () => {
    Axios.get('/user/mycourses', setHeader())
      .then((response) => {
        console.log(response);
        setEnrolledCourses(response.data.enrolledCourses);
      })
      .catch((error) => {
        console.error('Error fetching enrolled courses:', error);
      });
  };

  return (
    <div className="container">
      {/* Course details or enrollment button */}
      <div className="card mx-auto col-md-7">
        <div className="card-body ">
          <h1>{course.title}</h1>
        </div>
        <div className="card-body">
          <p>Duration: {course.duration}</p>
          <p>Description: {course.description}</p>
          <p>Price: ${course.price}</p>

          {/* Conditional rendering based on enrollment status */}
          {isEnrolled ? (
            <p style={{ color: 'blue' }}>You are already enrolled in this course !!</p>
          ) : (
            <div className='d-flex gap-2 align-items-center justify-content-center'>
              <button onClick={addCourseToCart} className="btn btn-secondary">Enroll Now</button>
            </div>
          )}
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentLabel="Modal"
      >
        <div>
          <h2>Your Request Status</h2>
          <p>{modalMessage}</p>
          <button onClick={() => setIsModalOpen(false)}>Close </button>
        </div>
      </ReactModal>
    </div>
  );
}
