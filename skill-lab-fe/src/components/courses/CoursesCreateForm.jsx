import React from 'react'
import { useState } from 'react'

export default function CoursesCreateForm(props) {

    const [newCourse, setNewCourse] = useState({})

    const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    
    const course = {...newCourse}
    course[attributeToChange] = newValue
    console.log(course)
    setNewCourse(course)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addCourse(newCourse)
    }
    

  return (
    <div>
   <h1>Create Course</h1>

<form onSubmit={handleSubmit} >
<div>
<label>Category</label>
<input type='text' name='category_id' onChange={handleChange}  className='form-control'></input>
</div>

<div>
<label>Title</label>
<input type='text' name='title' onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Duration</label>
    <input type='number' name='duration' onChange={handleChange} className='form-control'></input>
</div>


<div>
    <label>Description</label>
    <input type='text' name='description' onChange={handleChange} className='form-control'></input>
</div>

<div>
    <label>Price</label>
    <input type='number' name='price' onChange={handleChange} className='form-control'></input>
</div>

    <div>
        <input type='submit' value="Add Course" className='btn btn-primary'></input>
    </div>
    </form>
</div>
  )
}
