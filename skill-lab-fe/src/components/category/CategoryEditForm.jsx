import React, { useState } from 'react'

export default function CategoryEditForm(props) {
    const [category, setCategory] = useState(props.category);

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        const newValue = event.target.value;

        const updatedCategory = {...category}
        updatedCategory[attributeToChange] = newValue;
        console.log(updatedCategory);
        setCategory(updatedCategory);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.updateCategory(category);
        event.target.reset();
    }

    
  return (
    <div>
          <h2 className='text-center'>Edit Category</h2>
          <form onSubmit={handleSubmit}>
            <>
            <div className='row d-flex justify-content-center align-items-center'>
              <div className='col-md-6'>
                  <label>Name</label>
                  <input type='text' value={category.name} className="form-control" name='name' onChange={handleChange}></input>
              </div>
            </div>

 <br></br>
            <div className='row d-flex justify-content-center align-items-center text-center'>
              <div  className='col-md-6' >
                  <input type='submit' className="btn btn-secondary" value="Update Category"/>
              </div>
           </div>
              </>
              <br></br>
          </form>
    </div>
  )
}
