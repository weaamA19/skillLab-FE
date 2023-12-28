import React from 'react'
import { useState } from 'react'

export default function CoursesEditForm(props) {

    const [editCourse, setEditCourse] = useState({})

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const course = {...editCourse}
    course[attributeToChange] = newValue
    console.log(course)
    setEditCourse(course)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addCourse(editCourse)
    }
    




  return (
    <div>

<h1>Edit Course</h1>

<form onSubmit={handleSubmit} >
<div>
<label>Category</label>
<input type='text' name='category_id' onChange={handleChange}  className='form-control'></input>
</div>

<div>
<label>Title</label>
<input type='text' name='title'  onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Duration</label>
    <input type='number' name='duration'  onChange={handleChange} className='form-control'></input>
</div>


<div>
    <label>Description</label>
    <input type='text' name='description'  onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Price</label>
    <input type='number' name='price'  onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Edit Course" className='btn btn-primary'></input>
    </div>
    </form>
    </div>
  )
}
