import React from 'react'
import { useState } from 'react'

export default function CoursesEditForm(props) {

    const [editCourse, setEditCourse] = useState(props.courses)

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const updatedcourse = {...editCourse}
    updatedcourse[attributeToChange] = newValue
    console.log(updatedcourse)
    setEditCourse(updatedcourse)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateTheview(editCourse)
        event.target.reset()
    }
    




  return (
    <div>

<h1>Edit Course</h1>

<form onSubmit={handleSubmit} >
<div>
<label>Category</label>
<input type='text' name='category_id' value={editCourse.category} onChange={handleChange}  className='form-control'></input>
</div>

<div>
<label>Title</label>
<input type='text' name='title' value={editCourse.title} onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Duration</label>
    <input type='string' name='duration' value={editCourse.duration} onChange={handleChange} className='form-control'></input>
</div>


<div>
    <label>Description</label>
    <input type='text' name='description' value={editCourse.description} onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Price</label>
    <input type='number' name='price' value={editCourse.price}  onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Edit Course" className='btn btn-primary'></input>
    </div>
    </form>
    </div>
  )
}
