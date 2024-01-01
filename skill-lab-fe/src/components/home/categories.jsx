import React, { useState, useEffect } from 'react';
import Axios from 'axios'


export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);
    
    const loadCategories= () => {
        Axios.get('/category/index') 
            .then((response) => {
            console.log(response);
            setCategories(response.data.categories);
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
    };
  
    return (
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {categories.map((category) => (
              <div key={category._id} className="col">
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
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      {category.name} {/* Display category name */}
                    </text>
                  </svg>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          View Courses
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}