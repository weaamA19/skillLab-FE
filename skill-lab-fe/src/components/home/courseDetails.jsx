import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import "./modalstyles.css";

export default function CourseDetails(props) {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  // const [cartId, setCartId] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState([]); 

    const setHeader = ()=> {
      const authheader = {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
          }
      }
      return authheader;
    };
    useEffect(() => {
      loadCourseDetails();
      // obtainCartId();
    }, []);

    // const obtainCartId = () => {
    //   Axios.get(`cart/index`) //${user_id} //?id=65941f91c4d719411671a037
    //   .then((response) => {
    //     console.log("load cart details",response);
    //     setCartId(response.data.cart._id);// set cartId
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // };
  
    const loadCourseDetails = () => {
        Axios.get(`/courses/detail/${id}`)
        .then((response) => {
            console.log(response);
            setCourseId(response.data.courses._id);
            setCourses(response.data.courses);
          })
          .catch((error) => {
            console.error('Error fetching course details', error);
          });
      };

      const addCourseToCart = () => {
        Axios.put(`/cart/update`, { courses: courseId }, setHeader())
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

  return (
    <div>
    <div className="container">
      <div className="card mx-auto text-center col-md-7">
          <div className="card-body ">
            <h1>{courses.title}</h1>
          </div>

          <div className="card-body">
            <h3>{courses.duration}</h3>
            <h3>{courses.description}</h3>
            <h3>{courses.price}</h3>
            <button onClick={addCourseToCart} className="btn btn-secondary">Enroll Now</button>
          </div>
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
  )
}
