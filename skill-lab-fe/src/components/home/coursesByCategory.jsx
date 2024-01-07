import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

export default function CoursesByCategory() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { categoryId } = useParams();

    const setHeader = ()=> {
      const authheader = {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
          }
      }
      return authheader;
    };
  
    useEffect(() => {
      setSelectedCategory(categoryId);
      fetchCoursesByCategory(categoryId);
      fetchCategories();
    }, [categoryId]);
  
    const fetchCoursesByCategory = (categoryId) => {
      Axios.get(`/courses/coursesByCategory/${categoryId}`)
        .then((response) => {
          setCourses(response.data.coursesArray);
        })
        .catch((error) => {
          console.error(`Error fetching courses for category ID ${categoryId}:`, error);
        });
    };
  
    const fetchCategories = () => {
      Axios.get('/category/index', setHeader())
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    };
  
    const getCategoryNameById = (categoryId) => {
      const selectedCat = categories.find((cat) => cat._id === categoryId);
      return selectedCat ? selectedCat.name : '';
    };
  return (
    <div>
        <div className="album py-5 bg-body-tertiary">
          <h2 className='text-center'>Courses for {getCategoryNameById(selectedCategory)}</h2>
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {courses.map((course) => (
                <div key={course._id} className="col">
                  <div className="card shadow-sm ">
                    <svg
                      className="bd-placeholder-img card-img-top text-center"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Small Image"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c" />
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                        {course.title} 
                      </text>
                    </svg>
                    <div className="card-body d-flex flex-column align-items-center text-center">
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="btn-group">
                        <Link to={`/courses/detail/${course._id}`} className="btn btn-sm btn-outline-secondary">
                            View Course Details
                        </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}
