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
          <h2 className='text-center'>Create Category</h2>
          <form onSubmit={handleSubmit}>

        <div className='row d-flex justify-content-center align-items-center'>
              <div className='col-md-6'>
                  <label> Category Name</label>
                  <input type='text' className="form-control" name='name' onChange={handleChange}></input>
              </div>
        </div>

<br></br>

        <div className='row d-flex justify-content-center align-items-center text-center'>
              <div className='col-md-6'  >
                  <input type='submit' className="btn btn-secondary" value="Add Category"/>
              </div>
              
             

         </div>     
         
        <br></br>
          </form>
    </div>
  )
}
