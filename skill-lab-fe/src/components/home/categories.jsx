import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import CoursesByCategory from './coursesByCategory'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const setHeader = ()=> {
    const authheader = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    return authheader;
  };


  const loadCategories = () => {
    Axios.get('/category/index', setHeader())
      .then((response) => {
        console.log(response);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  // const fetchCoursesByCategory = (categoryId) => {
  //   Axios.get(`/courses/coursesByCategory?categoryId=${categoryId}`)
  //     .then((response) => {
  //       console.log(response)
  //       setCourses(response.data.coursesArray);
  //     })
  //     .catch((error) => {
  //       console.error(`Error fetching courses for category ID ${categoryId}:`, error);
  //     });
  // };

  // const handleCategoryChange = (categoryId) => {
  //   setSelectedCategory(categoryId);
  //   fetchCoursesByCategory(categoryId); 
  // };

  // const getCategoryNameById = (categoryId) => {
  //   const selectedCat = categories.find((cat) => cat._id === categoryId);
  //   return selectedCat ? selectedCat.name : '';
  // };

  return (
    <>

      {/* Conditionally render courses based on selected category 
      {selectedCategory ? (
        <CoursesByCategory courses={courses} getCategoryNameById={getCategoryNameById} selectedCategory={selectedCategory}/>
      ) :
        ( */}
          <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {categories.map((category) => (
                <div key={category._id} className="col z-1">
                  <div className="card shadow-sm">
                    <svg
                      className="bd-placeholder-img card-img-top"
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
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em"  className="text-center">
                        {category.name} {/* Display category name */}
                      </text>
                    </svg>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          {/* <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleCategoryChange(category._id)}
                          >
                            View Courses
                          </button> */}
                          <Link to={`/courses/coursesByCategory/${category._id}`} className="btn btn-sm btn-outline-secondary">
                            View Courses 
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
   
      {/* )} */}

    </>
  );
}