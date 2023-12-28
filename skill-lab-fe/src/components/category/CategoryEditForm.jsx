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
          <h1>Edit Category</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Name</label>
                  <input type='text' value={category.name} className="form-control" name='name' onChange={handleChange}></input>
              </div>

              <div>
                  <input type='submit' className="btn btn-primary" value="Update Category"/>
              </div>
          </form>
    </div>
  )
}
