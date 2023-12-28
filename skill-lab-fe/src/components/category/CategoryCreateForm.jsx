import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'

export default function CategoryCreateForm(props) {
    const [newCategory, setNewCategory] = useState([]);

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        const category = {...newCategory}
        category[attributeToChange] = newValue;
        console.log(category);
        setNewCategory(category);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addCategory(newCategory);
        event.target.reset();
    }


    
  return (
    <div>
          <h1>Create Category</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label> Category Name</label>
                  <input type='text' className="form-control" name='name' onChange={handleChange}></input>
              </div>

              <div>
                  <input type='submit' className="btn btn-primary" value="Add Category"/>
              </div>
          </form>
    </div>
  )
}
